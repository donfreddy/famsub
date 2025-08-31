import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiResponse, SwaggerApiResponse } from '../../common/decorators';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { OfferService } from './offer.service';

@ApiTags('offers')
@ApiSecurity('api-key')
@Controller({ path: 'vaults', version: '1' })
export class VaultsController {
  constructor(private readonly offerService: OfferService) {}

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: '' })
  @ApiOperation({ summary: 'Retrieve user vault credentials' })
  @ApiQuery({ name: 'offer_id', description: 'Offer ID to retrieve credentials for' })
  @ApiQuery({ name: 'pin_code', description: 'Pin code for a user' })
  @Get()
  async findVault(
    @GetUser() user: User,
    @Query('offer_id') offerId: string,
    @Query('pin_code') pinCode: string,
  ): Promise<object> {
    // return await this.offerService.findProfile(user.id);
    return {};
  }
}
