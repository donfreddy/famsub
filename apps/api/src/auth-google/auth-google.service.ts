import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { AuthConfigService } from '../config';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';
import { SocialInterface } from '../types';

@Injectable()
export class AuthGoogleService {
  private google: OAuth2Client;

  constructor(authConfig: AuthConfigService) {
    this.google = new OAuth2Client(authConfig.googleClientId, authConfig.googleClientSecret);
  }

  async getProfileByToken(loginDto: AuthGoogleLoginDto): Promise<SocialInterface> {
    try {
      const ticket = await this.google.verifyIdToken({
        idToken: loginDto.id_token,
        audience: [this.google._clientId],
      });

      const data = ticket.getPayload();
      if (!data) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: { user: 'wrongToken' },
        });
      }

      return {
        id: data.sub,
        email: data.email,
        firstName: data.given_name,
        lastName: data.family_name,
        avatar: data.picture,
      };
    } catch (error) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { user: 'wrongToken' },
      });
    }
  }
}
