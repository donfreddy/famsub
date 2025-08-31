import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Public } from '../../auth/decorators/public.decorator';
import { ApiResponse, SwaggerApiResponse } from '../../common/decorators';
import { ServiceService } from './service.service';

@ApiTags('services')
@ApiSecurity('api-key')
@Controller({ path: 'services', version: '1' })
export class ServicesController {
  constructor(private readonly serviceService: ServiceService) {}

  @Public()
  @SwaggerApiResponse()
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Find all services' })
  @Get()
  getMarketplaceItems() {
    return this.serviceService.findAll();
  }
}
