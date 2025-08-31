import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Facebook } from 'fb';
import { AuthConfigService } from 'src/config';
import { FacebookInterface, SocialInterface } from '../types';
import { AuthFacebookLoginDto } from './dto/auth-facebook-login.dto';

@Injectable()
export class AuthFacebookService {
  constructor(private authConfig: AuthConfigService) {}

  async getProfileByToken(loginDto: AuthFacebookLoginDto): Promise<SocialInterface> {
    try {
      const fb = new Facebook({
        appId: this.authConfig.facebookAppId,
        appSecret: this.authConfig.facebookAppSecret,
        version: 'v7.0',
      });
      fb.setAccessToken(loginDto.access_token);

      const data: FacebookInterface = await new Promise((resolve: any) => {
        fb.api('/me', 'get', { fields: 'id,last_name,email,first_name' }, (response) => {
          resolve(response);
        });
      });

      return {
        id: data.id,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
      };
    } catch (error) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { user: 'wrongToken' },
      });
    }
  }
}
