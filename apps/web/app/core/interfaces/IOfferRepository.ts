import type { ApiResponse, ApiPaginatedResponse, Offer, MarketplaceOffer } from "~~/app/core/entities";

export interface IOfferRepository {
  getOfferById(offerId: string): Promise<ApiResponse<Offer>>;

  getOffersByService(slug: string): Promise<ApiPaginatedResponse<MarketplaceOffer>>;
}
