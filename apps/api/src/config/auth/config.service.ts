import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with auth config based operations.
 *
 * @class
 */
@Injectable()
export class AuthConfigService {
  constructor(private configService: ConfigService) {}

  get publicKeyPath(): string {
    return this.configService.get<string>('auth.key.publicKeyPath');
  }

  get privateKeyPath(): string {
    return this.configService.get<string>('auth.key.privateKeyPath');
  }

  get accessTokenValidity(): number {
    return this.configService.get<number>('auth.token.accessTokenValidity');
  }

  get refreshTokenValidity(): number {
    return this.configService.get<number>('auth.token.refreshTokenValidity');
  }

  get issuer(): string {
    return this.configService.get<string>('auth.token.issuer');
  }

  get audience(): string {
    return this.configService.get<string>('auth.token.audience');
  }

  get googleClientId(): string {
    return this.configService.get<string>('auth.google.clientId');
  }

  get googleClientSecret(): string {
    return this.configService.get<string>('auth.google.clientSecret');
  }

  get facebookAppId(): string {
    return this.configService.get<string>('auth.facebook.appId');
  }

  get facebookAppSecret(): string {
    return this.configService.get<string>('auth.facebook.appSecret');
  }
}
