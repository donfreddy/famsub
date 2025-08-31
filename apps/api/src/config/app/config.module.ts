import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { AppConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
      validationSchema: Joi.object({
        APP_ENV: Joi.string().valid('dev', 'prod').default('dev'),
        APP_HOST: Joi.string().default('localhost'),
        APP_PORT: Joi.number().default(3000),
        APP_FALLBACK_LANGUAGE: Joi.string().default('en'),
        APP_DEBUG: Joi.boolean().default(false),
        APP_NAME: Joi.string().default('Jointly'),
        APP_LOG_DIR: Joi.string().default('logs'),
        APP_TZ: Joi.string().default('UTC'),
        //APP_URL: Joi.string().uri().default('http://localhost:3000'),
        SENTRY_DSN: Joi.string().uri().default(''),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
