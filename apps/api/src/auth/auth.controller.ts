import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Req,
  Request,
  SerializeOptions,
  UnauthorizedException,
} from '@nestjs/common';
import { EmailLoginDto } from './dto/email-login.dto';
import { EmailRegisterDto } from './dto/email-register.dto';
import { UserAuthDto } from './dto/user-auth.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiResponse, SwaggerApiResponse } from '../common/decorators';
import { Public } from './decorators/public.decorator';
import { ProtectedRequest, PublicRequest } from '../common/helpers';
import { TokenRefreshDto } from './dto/token-refresh.dto';
import { UserTokensDto } from './dto/user-tokens.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '../models/user/entities/user.entity';
import { getGeoLocation } from '../common/helpers/utils.helper';
import { DeviceInfo } from '../common/interceptors';

@ApiTags('auth')
@ApiSecurity('api-key')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @SwaggerApiResponse()
  @ApiBody({ description: 'Register a new user', type: EmailRegisterDto })
  @ApiResponse({ key: 'auth.success.register' })
  @ApiOperation({ summary: 'Register new user' })
  @Post('email/register')
  async emailRegister(@Req() req: PublicRequest, @Body() inputs: EmailRegisterDto): Promise<UserAuthDto> {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const location = await getGeoLocation(typeof ip === 'string' ? ip : ip[0]);

    const deviceInfo = {
      browser: req['deviceInfo']['browser'],
      device: req['deviceInfo']['device'],
      location: location !== null ? `${location['city']}, ${location['country']}` : 'Unknown',
    } as DeviceInfo;

    const { user, tokens } = await this.authService.emailRegister(inputs, deviceInfo);
    return new UserAuthDto(user, tokens);
  }

  @Public()
  @SwaggerApiResponse()
  @ApiBody({ description: 'Login a user with his email and password', type: EmailLoginDto })
  @ApiResponse({ key: 'auth.success.login' }, HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in a user with his email and password' })
  @Post('email/login')
  async emailLogin(@Req() req: PublicRequest, @Body() inputs: EmailLoginDto): Promise<UserAuthDto> {
    const deviceInfo = await this.authService.extractDeviceInfo(req);

    const { user, tokens } = await this.authService.emailLogin(inputs, deviceInfo);
    return new UserAuthDto(user, tokens);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: 'auth.success.logout' })
  @ApiOperation({ summary: 'Sign out a user' })
  @Delete('logout')
  async signOut(@Request() request: ProtectedRequest): Promise<object> {
    return await this.authService.signOut(request.keystore);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: 'auth.success.logout_all' })
  @ApiOperation({ summary: 'Sign out from all devices' })
  @Delete('logout/all')
  async signOutAll(@GetUser() user: User): Promise<object> {
    return await this.authService.signOutFromEverywhere(user);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: 'auth.success.token_issued' })
  @ApiOperation({ summary: 'Refresh the access token' })
  @Post('token/refresh')
  async tokenRefresh(@Request() req: ProtectedRequest, @Body() inputs: TokenRefreshDto): Promise<UserTokensDto> {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer' || token === undefined) {
      throw new UnauthorizedException({ key: 'exception.unauthorized' });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const location = await getGeoLocation(typeof ip === 'string' ? ip : ip[0]);

    const deviceInfo = {
      browser: req['deviceInfo']['browser'],
      device: req['deviceInfo']['device'],
      location: location !== null ? `${location['city']}, ${location['country']}` : 'Unknown',
    } as DeviceInfo;

    const { tokens } = await this.authService.refreshToken(inputs, token, deviceInfo);
    return tokens;
  }
}
