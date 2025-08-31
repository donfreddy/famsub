import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { MarketplaceService } from './marketplace.service';
import { ApiResponse, GetRoute, SwaggerApiPagedResponse, SwaggerApiResponse } from '../../common/decorators';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../../common/constants';
import { getLimit } from '../../common/helpers/utils.helper';
import { OfferFilterDto } from './dto/offer-filter.dto';
import { SortDirection } from '../../common/helpers';
import { FindOptionsWhere } from 'typeorm';
import { Offer } from '../offer/entities/offer.entity';
import { SortOptions } from '../../common/services/filter.service';
import { NullableType } from '../../types/nullable.type';
import { Public } from '../../auth/decorators/public.decorator';

@ApiSecurity('api-key')
@ApiTags('marketplace')
@Controller({ path: 'marketplace', version: '1' })
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Public()
  @SwaggerApiResponse()
  @ApiResponse({ key: '' })
  @ApiOperation({ summary: 'Returns all services' })
  @Get('services')
  async getMarketplaceItems() {
    return this.marketplaceService.getMarketplaceItems();
  }

  @Public()
  @SwaggerApiResponse()
  @SwaggerApiPagedResponse()
  @ApiResponse({ key: '' })
  @ApiOperation({ summary: 'Returns all offers for a service' })
  @ApiParam({ name: 'slug', description: 'Slug of the service' })
  @ApiQuery({ name: 'invoice_verified', description: 'Auto renew status', required: false, type: Boolean })
  @ApiQuery({ name: 'auto_accept', description: 'Auto renew status', required: false, type: Boolean })
  @ApiQuery({ name: 'sort_by', required: false, description: 'Field to sort by (e.g., price, score)' })
  @Get('services/:slug/offers')
  async getMarketplaceOffers(
    @GetRoute() route: string,
    @Param('slug') serviceSlug: string,
    @Query('page', new DefaultValuePipe(DEFAULT_PAGE), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(DEFAULT_LIMIT), ParseIntPipe) limit: number,
    @Query() filterDto: OfferFilterDto,
    @Query('sort_by') sort?: string,
  ) {
    const { invoice_verified: invoiceVerified, auto_accept: autoAccept } = filterDto;
    limit = getLimit(limit);

    // Create sort options
    const sortOptions: NullableType<SortOptions> = sort
      ? {
          field: sort,
          direction: SortDirection.ASC,
        }
      : undefined;

    const queryParams = [];
    if (invoiceVerified) queryParams.push(`invoice_verified=${invoiceVerified}`);
    if (autoAccept) queryParams.push(`auto_accept=${autoAccept}`);
    if (sort) queryParams.push(`sort_by=${sort}`);
    route = `${route}?${queryParams.join('&')}`;

    const where: FindOptionsWhere<Offer> = {};

    // Add explicit filters
    if (invoiceVerified) where.invoice_verified = invoiceVerified;
    if (autoAccept) where.auto_accept = autoAccept;

    return this.marketplaceService.getMarketplaceOffers(serviceSlug, { page, limit, route }, where, sortOptions);
  }
}
