import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfigModule, AppConfigService, AuthConfigModule, DatabaseConfigModule } from './config';
import { LogsMiddleware } from './common/middlewares';
import * as path from 'path';
import { HeaderResolver, I18nJsonLoader, I18nModule, QueryResolver } from 'nestjs-i18n';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './models/user/user.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { APP_FILTER } from '@nestjs/core';
import { UserAgentMiddleware } from './common/middlewares/user-agent.middleware';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { AuthFacebookModule } from './auth-facebook/auth-facebook.module';
import { CategoryModule } from './models/category/category.module';
import { ServiceModule } from './models/service/service.module';
import { CurrencyModule } from './models/currency/currency.module';
import { OfferModule } from './models/offer/offer.module';
import { MarketplaceModule } from './models/marketplace/marketplace.module';

@Module({
  imports: [
    /**
     * External Modules
     */
    SentryModule.forRoot(),
    I18nModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (appConfig: AppConfigService) => ({
        fallbackLanguage: appConfig.fallbackLanguage,
        loaderOptions: {
          path: path.join(__dirname, '/i18n/'),
          debug: appConfig.debug,
          //watch: true, // Enable live translations
        },
      }),
      loader: I18nJsonLoader,
      inject: [AppConfigService],
      resolvers: [new HeaderResolver(['x-custom-lang']), new QueryResolver(['lang'])],
    }),

    /**
     * Internal Modules
     */
    AppConfigModule,
    DatabaseConfigModule,
    AuthConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    HealthModule,
    AuthGoogleModule,
    AuthFacebookModule,
    CategoryModule,
    ServiceModule,
    CurrencyModule,
    OfferModule,
    MarketplaceModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware, UserAgentMiddleware).forRoutes('*');
  }
}
