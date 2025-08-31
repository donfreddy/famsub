import type { AxiosInstance } from "axios";
import type { IServiceRepository } from "~~/app/core/interfaces";
import type { ApiResponse, MarketplaceService, Service } from "~~/app/core/entities";

export class ServiceRepository implements IServiceRepository {
  constructor(private readonly httpClient: AxiosInstance) {
  }

  async getServices(): Promise<ApiResponse<Service[]>> {
    const response = await this.httpClient.get<ApiResponse<Service[]>>('/v1/services');
    return response.data;
  }

  async getServicesForMarketplace(): Promise<ApiResponse<MarketplaceService[]>> {
    const response = await this.httpClient.get<ApiResponse<MarketplaceService[]>>('/v1/marketplace/services');
    return response.data;
  }
}
