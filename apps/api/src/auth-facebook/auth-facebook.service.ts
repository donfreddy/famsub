import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import fetch from 'node-fetch';
import { AuthConfigService } from 'src/config';
import { FacebookInterface, SocialInterface } from '../types';
import { AuthFacebookLoginDto } from './dto/auth-facebook-login.dto';

@Injectable()
export class AuthFacebookService {
  constructor(private readonly authConfig: AuthConfigService) {}

  async getProfileByToken(loginDto: AuthFacebookLoginDto): Promise<SocialInterface> {
    try {
      const fields = 'id,last_name,email,first_name';
      const url = `https://graph.facebook.com/v19.0/me?fields=${fields}&access_token=${loginDto.access_token}`;

      const response = await fetch(url);
      const data: FacebookInterface & { error?: any } = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return {
        id: data.id,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
      };
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { user: 'wrongToken' },
      });
    }
  }
}
