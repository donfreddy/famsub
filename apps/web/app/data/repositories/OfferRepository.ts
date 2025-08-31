import type { AxiosInstance } from "axios";
import type { IOfferRepository } from "~~/app/core/interfaces";
import type { ApiResponse, ApiPaginatedResponse, MarketplaceOffer, Offer } from "~~/app/core/entities";

export class OfferRepository implements IOfferRepository {
  constructor(private readonly httpClient: AxiosInstance) {
  }

  async getOfferById(offerId: string): Promise<ApiResponse<Offer>> {
    const response = await this.httpClient.get<ApiResponse<Offer>>(`/v1/offer/${offerId}`);
    return response.data;
  }

  async getOffersByService(slug: string): Promise<ApiPaginatedResponse<MarketplaceOffer>> {
    const response = await this.httpClient.get<ApiPaginatedResponse<MarketplaceOffer>>(`/v1/marketplace/services/${slug}/offers`);
    return response.data;
  }
}
