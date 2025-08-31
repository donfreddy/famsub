import type {ApiResponse, MarketplaceService, Service} from "~~/app/core/entities";

export interface IServiceRepository {
  getServices(): Promise<ApiResponse<Service[]>>;

  getServicesForMarketplace(): Promise<ApiResponse<MarketplaceService[]>>;
}
