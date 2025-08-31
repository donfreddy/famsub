import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { ApiResponse, GetUser, SwaggerApiResponse } from '../../common/decorators';
import { Offer } from './entities/offer.entity';
import { User } from '../user/entities/user.entity';

@ApiTags('offers')
@ApiSecurity('api-key')
@Controller({ path: 'offer', version: '1' })
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiBody({ description: 'Create a new offer', type: CreateOfferDto })
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Create a new offer' })
  @Post()
  async create(@GetUser() user: User, @Body() inputs: CreateOfferDto): Promise<object> {
    return await this.offerService.create(user, inputs);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Get offer by ID' })
  @ApiParam({ name: 'id', description: 'Offer ID' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Offer> {
    const offer = await this.offerService.findById(id);
    if (!offer) {
      throw new BadRequestException(`Offer with id ${id} not found`);
    }
    return offer;
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Delete a offer' })
  @ApiParam({ name: 'id', description: 'Offer ID' })
  @Delete(':id')
  async delete(@Param('id') offerId: string): Promise<object> {
    await this.offerService.remove(offerId);
    return { deleted: true };
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Collection date for an offer' })
  @ApiBody({
    description: 'Collection date for an offer',
    schema: { type: 'object', properties: { day_collection_date: { type: 'number', example: 5 } } },
  })
  @ApiParam({ name: 'id', description: 'Offer ID' })
  @Put(':id/collection-date')
  async setCollectionDate(
    @Param('id') offerId: string,
    @Body()
    body: {
      day_collection_date: number;
    },
  ): Promise<object> {
    const { day_collection_date: dayCollectionDate } = body;
    if (typeof dayCollectionDate !== 'number' || dayCollectionDate < 1 || dayCollectionDate > 30) {
      throw new BadRequestException('day_collection_date must be a number between 1 and 30');
    }
    return await this.offerService.setCollectionDate(offerId, dayCollectionDate);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Increase reserved spots for an offer' })
  @ApiParam({ name: 'id', description: 'Offer ID' })
  @Put(':id/reserved-slot/increase')
  async increaseReservedSlot(@Param('id') offerId: string): Promise<object> {
    return await this.offerService.increaseReservedSlots(offerId);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Decrease reserved spots for an offer' })
  @ApiParam({ name: 'id', description: 'Offer ID' })
  @Put(':id/reserved-slot/decrease')
  async decreaseReservedSlots(@Param('id') offerId: string): Promise<object> {
    return await this.offerService.decreaseReservedSlots(offerId);
  }

  @ApiBearerAuth()
  @SwaggerApiResponse()
  @ApiResponse({ key: 'response.success' })
  @ApiOperation({ summary: 'Toggle offer status' })
  @ApiParam({ name: 'id', description: 'Offer ID' })
  @Put(':id/toggle-status')
  async toggleStatus(@Param('id') offerId: string): Promise<object> {
    return await this.offerService.toggleStatus(offerId);
  }
}
