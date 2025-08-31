import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfigService } from './config.service';

/**
 * Import and provide db configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().default(5432).required(),
        POSTGRES_USERNAME: Joi.string().required().default('postgres'),
        POSTGRES_PASSWORD: Joi.string().required().default(''),
        POSTGRES_DATABASE: Joi.string().required().default('jointly_db'),
        POSTGRES_SYNC: Joi.boolean().required(),
        POSTGRES_KEEP_ALIVE: Joi.boolean().required(),
        POSTGRES_DROP_SCHEMA: Joi.boolean().required(),
      }),
    }),
  ],
  providers: [ConfigService, DatabaseConfigService],
  exports: [ConfigService, DatabaseConfigService],
})
export class DatabaseConfigModule {}
