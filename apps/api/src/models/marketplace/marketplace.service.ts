import { Injectable } from '@nestjs/common';
import { OfferService } from '../offer/offer.service';
import { ServiceService } from '../service/service.service';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Offer } from '../offer/entities/offer.entity';
import { FindOptionsWhere } from 'typeorm';
import { SortOptions } from '../../common/services/filter.service';

@Injectable()
export class MarketplaceService {
  constructor(
    private readonly serviceService: ServiceService,
    private readonly offerService: OfferService,
    // private readonly currencyService: CurrencyService,
    // private readonly eventEmitter: EventEmitter2,
  ) {}

  async getMarketplaceItems(): Promise<object[]> {
    return this.serviceService.findForMarketplace();
  }

  async getMarketplaceOffers(
    serviceSlug: string,
    options: IPaginationOptions,
    where?: FindOptionsWhere<Offer>,
    sortOptions?: SortOptions,
  ): Promise<object> {
    return this.offerService.findForMarketplace(serviceSlug,options, where, sortOptions);
  }
}
