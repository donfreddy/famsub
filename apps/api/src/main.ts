import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as Sentry from '@sentry/nestjs';
import { swaggerSetup } from './swagger-setup';
import { AppConfigService } from './config';
import { ClassSerializerInterceptor, VersioningType, ValidationPipe, Logger } from '@nestjs/common';
import { ResolvePromisesInterceptor } from './common/interceptors';
import validationOptions from './common/helpers/validation-options';
import { useContainer } from 'class-validator';
import { Environment } from './common/helpers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const allowedOrigins = [
    'http://localhost:3000',
    'https://famsub.vercel.app',
    'https://famsub.com',
    'https://famsub-admin.vercel.app',
    'https://admin.famsub.com',
  ];

  // Remove the default 'x-powered-by: Express' header
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  // Increase the request body size limit (JSON and URL-encoded data)
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(
    // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
    // https://github.com/typestack/class-transformer/issues/549
    new ResolvePromisesInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  //app.useGlobalPipes(new ValidationPipe());

  // Get app config for cors settings and starting the app.
  const appConfig: AppConfigService = app.get(AppConfigService);
  const { host, port, sentryDsn, env } = appConfig;

  const url = `${host === 'localhost' ? `http://${host}:${port}` : `https://${host}`}`;

  swaggerSetup(app, url);

  Sentry.init({
    dsn: sentryDsn,
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });

  await app.listen(port, () => {
    if (env !== Environment.PRODUCTION) {
      Logger.log(`🚀 Application running at: ${url}`, 'NestApp');
      Logger.log(`📘 Swagger available at: ${url}/docs`, 'NestApp');
      Logger.log(`🌱 Environment: ${env}`, 'NestApp');
    } else {
      Logger.log(`🚀 Application started in production on port ${port}`, 'NestApp');
    }
  });
}

void bootstrap();
