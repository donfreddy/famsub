import type { IOfferRepository } from "~~/app/core/interfaces";
import type { ApiPaginatedResponse, MarketplaceOffer } from "~~/app/core/entities";


export class GetOffersByServiceUseCase {
  constructor(private readonly offerRepo: IOfferRepository) { }

  async execute(slug: string): Promise<ApiPaginatedResponse<MarketplaceOffer>> {
    return this.offerRepo.getOffersByService(slug);
  }
}
