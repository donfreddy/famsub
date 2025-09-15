import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfigService } from './config.service';

/**
 * Import and provide auth configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
      validationSchema: Joi.object({
        AUTH_PUBLIC_KEY_PATH: Joi.string().default('keys/public.pem'),
        AUTH_PRIVATE_KEY_PATH: Joi.string().default('keys/private.pem'),
        ACCESS_TOKEN_VALIDITY_SEC: Joi.number().default(172800),
        REFRESH_TOKEN_VALIDITY_SEC: Joi.number().default(604800),
        TOKEN_ISSUER: Joi.string().default('api.dev.xyz.com'),
        TOKEN_AUDIENCE: Joi.string().default('xyz.com'),
        GOOGLE_CLIENT_ID: Joi.string().default('google-client-id'),
        GOOGLE_CLIENT_SECRET: Joi.string().default('google-client-secret'),
      }),
    }),
  ],
  providers: [ConfigService, AuthConfigService],
  exports: [ConfigService, AuthConfigService],
})
export class AuthConfigModule {}
