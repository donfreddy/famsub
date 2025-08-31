import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

export function swaggerSetup(app: INestApplication, url: string): void {
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Famsub API')
      .setDescription('We connect subscription owners and co-subscribers securely, for simple and economical sharing.')
      .setVersion('1.0.0')
      .setContact('Famsub', 'https://famsub.com', 'famsubteam@gmail.com')
      .setTermsOfService('https://swagger.io/terms/')
      .addTag('Health', 'API health check to see if the server is running')
      .addTag('auth', 'Authentication and authorization related operations')
      .addTag('marketplace', 'Operations related to marketplace')
      .addTag('me', 'Operations related to current user')
      .addTag('users', 'Operations related to users')
      .addTag('services', 'Operations related to services')
      .addTag('categories', 'Operations related to categories')
      .addTag('offers', 'Operations related to offers')
      .addServer(url, 'The base url of the server')
      .addApiKey(
        {
          type: 'apiKey',
          name: 'x-api-key', // The header key for your API key
          in: 'header', // Specify the location of the API key
        },
        'api-key', // Name of the security scheme
      )
      .addBearerAuth()
      .build(),
  );

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      filter: true,
      persistAuthorization: true,
      showRequestDuration: true,
    },
    customSiteTitle: 'Famsub API Documentation',
    useGlobalPrefix: true,
    jsonDocumentUrl: '/docs/json',
    yamlDocumentUrl: '/docs/yaml',
  };
  SwaggerModule.setup('/docs', app, document, customOptions);
}
