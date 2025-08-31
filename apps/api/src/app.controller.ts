import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AppConfigService } from './config';
import { ApiResponse } from './common/decorators';
import { Public } from './auth/decorators/public.decorator';

@ApiTags('Health')
@ApiSecurity('api-key')
@Controller()
export class AppController {
  constructor(private readonly appConfig: AppConfigService) {}

  @Public()
  @ApiOperation({ summary: 'Return information about the API' })
  @ApiQuery({ name: 'lang', description: 'Language code for the response', enum: ['en', 'fr'] })
  @ApiResponse({ key: 'response.success' })
  @Get()
  getInfo(): object {
    const { host, port } = this.appConfig;
    const url = host === 'localhost' ? 'http://' + host + ':' + port : 'https://' + host;

    return {
      name: 'Famsub API',
      description: 'REST API for Famsub platform',
      version: '1.0.0',
      api_version: 'v1',
      swagger_docs: `${url}/docs`,
      environment: this.appConfig.env,
      owner: {
        name: 'Famsub',
        url: 'https://famsub.com',
      },
      inspired_by: {
        name: 'Spliiit',
        url: 'https://spliiit.com',
      },
      released_at: null,
      created_at: 'November 12, 2024',
      last_updated: 'May 21, 2025',
    };
  }
}
