import type { IServiceRepository } from "~~/app/core/interfaces";
import type { ApiResponse, Service } from "~~/app/core/entities";


export class GetServicesUseCase {
  constructor(private readonly serviceRepo: IServiceRepository) { }

  async execute(): Promise<ApiResponse<Service[]>> {
    return this.serviceRepo.getServices();
  }
}
