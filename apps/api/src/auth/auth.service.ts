import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { randomBytes } from 'crypto';

import { UserService } from '../models/user/user.service';
import { User } from '../models/user/entities/user.entity';
import { EmailRegisterDto } from './dto/email-register.dto';
import { EmailLoginDto } from './dto/email-login.dto';
import { UserTokensDto } from './dto/user-tokens.dto';
import { TokenPayload } from './token/token.payload';
import { ApiKey } from './entities/api-key.entity';
import { Keystore } from './entities/keystore.entity';
import { TokenRefreshDto } from './dto/token-refresh.dto';
import { AuthConfigService } from '../config';
import { DeviceInfo } from '../common/interceptors';
import { getGeoLocation } from '../common/helpers/utils.helper';
import { SocialInterface } from '../types';
import { NullableType } from 'joi';
import { PublicRequest, Role } from 'src/common/helpers';

@Injectable()
export class AuthService {
  private readonly apiKeyRepo: Repository<ApiKey>;
  private readonly keystoreRepo: Repository<Keystore>;

  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly authConfig: AuthConfigService,
  ) {
    this.apiKeyRepo = this.dataSource.getRepository(ApiKey);
    this.keystoreRepo = this.dataSource.getRepository(Keystore);
  }

  /**
   * Register a new user with email and password
   */
  async emailRegister(
    inputs: EmailRegisterDto,
    deviceInfo: DeviceInfo,
  ): Promise<{ user: User; tokens: UserTokensDto }> {
    const existingUser = await this.userService.findByEmail(inputs.email);
    if (existingUser) {
      throw new BadRequestException({ key: 'auth.error.user_already_registered' });
    }

    const hashedPassword = await hash(inputs.password, 10);

    const newUser = new User();
    newUser.first_name = inputs.first_name;
    newUser.last_name = inputs.last_name;
    newUser.email = inputs.email;
    newUser.username = inputs.username;
    newUser.password = hashedPassword;
    newUser.role = Role.USER;
    newUser.contact_number = inputs.contact_number;
    // newUser.country = inputs.country;
    newUser.birthdate = new Date(inputs.birthdate);
    newUser.avatar = `https://api.dicebear.com/9.x/avataaars/svg?seed=${inputs.first_name}`;

    const createdUser = await this.userService.create(newUser);
    if (!createdUser) {
      throw new InternalServerErrorException();
    }

    const tokens = await this.createTokens(createdUser, deviceInfo);
    return { user: createdUser, tokens };
  }

  /**
   * Login user with email and password
   */
  async emailLogin(inputs: EmailLoginDto, deviceInfo: DeviceInfo): Promise<{ user: User; tokens: UserTokensDto }> {
    const user = await this.userService.findByEmail(inputs.email);
    if (!user) {
      throw new BadRequestException({ key: 'auth.error.user_not_registered' });
    }
    if (!user.password) {
      throw new BadRequestException({ key: 'auth.error.not_set_credentials' });
    }

    const isMatch = await compare(inputs.password, user.password);
    if (!isMatch) {
      throw new BadRequestException({ key: 'auth.error.invalid_credentials' });
    }

    const tokens = await this.createTokens(user, deviceInfo);
    return { user, tokens };
  }

  /**
   * Validate and handle social login
   */
  async validateSocialLogin(
    authProvider: User['provider'],
    socialData: SocialInterface,
    deviceInfo: DeviceInfo,
  ): Promise<{ user: User; tokens: UserTokensDto }> {
    const user = await this.findOrCreateSocialUser(authProvider, socialData);
    const tokens = await this.createTokens(user, deviceInfo);
    return { user, tokens };
  }

  /**
   * Log out current user session
   */
  async signOut(keyStore: Keystore) {
    await this.keystoreRepo.delete(keyStore.id);
    return { logout: true };
  }

  /**
   * Log out from all devices
   */
  async signOutFromEverywhere(user: User) {
    return this.keystoreRepo.delete({ client: { id: user.id } });
  }

  /**
   * Refresh tokens using a valid refresh token
   */
  async refreshToken(
    inputs: TokenRefreshDto,
    accessToken: string,
    deviceInfo: DeviceInfo,
  ): Promise<{ user: User; tokens: UserTokensDto }> {
    // Validate access token
    const accessTokenPayload = this.decodeToken(accessToken);
    if (!this.validatePayload(accessTokenPayload)) {
      throw new UnauthorizedException({ key: 'auth.error.invalid_access_token' });
    }

    const user = await this.userService.findById(accessTokenPayload.sub);
    if (!user) {
      throw new UnauthorizedException({ key: 'auth.error.user_not_registered' });
    }

    // Verify refresh token
    let refreshTokenPayload: TokenPayload;
    try {
      refreshTokenPayload = await this.verifyToken(inputs.refresh_token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException({ key: 'auth.error.refresh_token_expired' });
      }
      throw new UnauthorizedException({ key: 'auth.error.invalid_refresh_token' });
    }

    if (!this.validatePayload(refreshTokenPayload)) {
      throw new UnauthorizedException({ key: 'auth.error.invalid_refresh_token' });
    }

    // Make sure tokens belong to the same user
    if (accessTokenPayload.sub !== refreshTokenPayload.sub) {
      throw new UnauthorizedException({ key: 'auth.error.invalid_access_token' });
    }

    // Find and invalidate the current keystore
    const keystore = await this.findTokensKeystore(user, accessTokenPayload.prm, refreshTokenPayload.prm);

    if (!keystore) {
      throw new UnauthorizedException({ key: 'auth.error.invalid_access_token' });
    }

    await this.keystoreRepo.delete(keystore.id);

    // Create new tokens
    const tokens = await this.createTokens(user, deviceInfo);
    return { user, tokens };
  }

  /**
   * Extract device information from the request
   */
  async extractDeviceInfo(req: PublicRequest): Promise<DeviceInfo> {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ipAddress = typeof ip === 'string' ? ip : ip[0];
    const location = await getGeoLocation(ipAddress);

    return {
      browser: req['deviceInfo']['browser'],
      device: req['deviceInfo']['device'],
      location: location !== null ? `${location['city']}, ${location['country']}` : 'Unknown',
    };
  }

  /**
   * API key management
   */
  async findApiKey(key: string): Promise<ApiKey | null> {
    return this.apiKeyRepo.findOne({ where: { key, status: true } });
  }

  async createApiKey(apikey: Omit<ApiKey, 'id' | 'status'>): Promise<ApiKey> {
    return this.apiKeyRepo.save(apikey);
  }

  async deleteApiKey(apikey: ApiKey) {
    return this.apiKeyRepo.delete(apikey.id);
  }

  /**
   * Keystore management
   */
  async findKeystore(client: User, key: string): Promise<Keystore | null> {
    return this.keystoreRepo.findOne({
      where: {
        client: { id: client.id },
        primary_key: key,
        status: true,
      },
    });
  }

  /**
   * Token validation and creation
   */
  validatePayload(payload: TokenPayload): boolean {
    return (
      payload &&
      payload.iss === this.authConfig.issuer &&
      payload.aud === this.authConfig.audience &&
      !!payload.sub &&
      !!payload.prm
    );
  }

  async verifyToken(token: string): Promise<TokenPayload> {
    try {
      return await this.jwtService.verifyAsync<TokenPayload>(token);
    } catch (error) {
      if (error instanceof TokenExpiredError){
        throw new UnauthorizedException({ key: 'auth.error.access_token_expired' });
      }
      throw new UnauthorizedException({ key: 'auth.error.invalid_access_token' });
    }
  }

  // Private helper methods
  private async createTokens(user: User, deviceInfo: DeviceInfo): Promise<UserTokensDto> {
    const accessTokenKey = randomBytes(64).toString('hex');
    const refreshTokenKey = randomBytes(64).toString('hex');

    await this.createKeystore(user, accessTokenKey, refreshTokenKey, deviceInfo);

    const accessTokenPayload = new TokenPayload(
      this.authConfig.issuer,
      this.authConfig.audience,
      user.id,
      accessTokenKey,
      this.authConfig.accessTokenValidity,
    );

    const refreshTokenPayload = new TokenPayload(
      this.authConfig.issuer,
      this.authConfig.audience,
      user.id,
      refreshTokenKey,
      this.authConfig.refreshTokenValidity,
    );

    const accessToken = await this.signToken(accessTokenPayload);
    if (!accessToken) {
      throw new InternalServerErrorException({ key: 'exception.internal_server_error' });
    }

    const refreshToken = await this.signToken(refreshTokenPayload);
    if (!refreshToken) {
      throw new InternalServerErrorException({ key: 'exception.internal_server_error' });
    }

    return new UserTokensDto({
      accessToken,
      refreshToken,
    });
  }

  private async findOrCreateSocialUser(authProvider: User['provider'], socialData: SocialInterface): Promise<User> {
    let user: NullableType<User> = null;
    let userByEmail: NullableType<User> = null;

    const socialEmail = socialData.email?.toLowerCase();
    if (socialEmail) {
      userByEmail = await this.userService.findByEmail(socialEmail);
    }

    if (socialData.id) {
      user = await this.userService.findByProvider(socialData.id, authProvider);
    }

    if (user) {
      // Update email if needed
      if (socialEmail && !userByEmail) {
        user.email = socialEmail;
      }
      await this.userService.update(user.id, user);
    } else if (userByEmail) {
      user = userByEmail;
    } else if (socialData.id) {
      // Create a new user
      const newUser = new User();
      newUser.first_name = socialData.firstName;
      newUser.last_name = socialData.lastName;
      newUser.email = socialEmail ?? null;
      newUser.role = Role.USER;
      newUser.provider_id = socialData.id;
      newUser.provider = authProvider;
      newUser.email_verified = !!socialEmail;
      newUser.avatar = socialData.avatar ?? `https://api.dicebear.com/9.x/avataaars/svg?seed=${socialData.firstName}`;

      await this.userService.create(newUser);
      user = await this.userService.findById(newUser.id);
    }

    if (!user) {
      throw new UnauthorizedException({ key: 'auth.error.user_not_found' });
    }

    return user;
  }

  private async createKeystore(
    client: User,
    primaryKey: string,
    secondaryKey: string,
    deviceInfo: DeviceInfo,
  ): Promise<Keystore> {
    return this.keystoreRepo.save({
      client,
      primary_key: primaryKey,
      secondary_key: secondaryKey,
      browser: deviceInfo.browser,
      device: deviceInfo.device,
      location: deviceInfo.location,
    });
  }

  private async findTokensKeystore(client: User, primaryKey: string, secondaryKey: string): Promise<Keystore | null> {
    return this.keystoreRepo.findOne({
      where: {
        client: { id: client.id },
        primary_key: primaryKey,
        secondary_key: secondaryKey,
        status: true,
      },
    });
  }

  private async signToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.signAsync({ ...payload });
  }

  private decodeToken(token: string): TokenPayload {
    return this.jwtService.decode<TokenPayload>(token);
  }
}
