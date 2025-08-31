import type {IServiceRepository} from "~~/app/core/interfaces";
import type {ApiResponse, MarketplaceService} from "~~/app/core/entities";


export class GetServicesForMarketplaceUseCase {
  constructor(private readonly serviceRepo: IServiceRepository) {}

 async execute(): Promise<ApiResponse<MarketplaceService[]>> {
    return this.serviceRepo.getServicesForMarketplace();
  }
}
