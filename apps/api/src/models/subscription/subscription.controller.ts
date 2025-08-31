import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ApiResponse, SwaggerApiResponse } from '../../common/decorators';
import { ProtectedRequest } from '../../common/helpers';
import { Subscription } from './entities/subscription.entity';

@ApiSecurity('api-key')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiBody({ description: 'Create a new subscription', type: CreateSubscriptionDto })
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Create a new subscription' })
  @Post()
  async create(
    @Request() request: ProtectedRequest,
    @Body() inputs: CreateSubscriptionDto,
  ): Promise<Subscription> {
    return await this.subscriptionService.create(request.user, inputs);
  }
}
