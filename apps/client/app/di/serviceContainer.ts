import {HttpClientService} from "~~/app/data/services/HttpClientService";
import {ServiceRepository} from "~~/app/data/repositories/ServiceRepository";
import {GetServicesUseCase, GetServicesForMarketplaceUseCase} from "~~/app/core/usecases/service";

export function setupServiceDependencies(app: any) {
  // Create services
  const {apiBaseUrl, apiKey} = useRuntimeConfig().public
  const httpClientService = new HttpClientService(apiBaseUrl, apiKey);

  // Create repositories
  const serviceRepository = new ServiceRepository(httpClientService.instance);

  // Create use cases
  const getServicesUseCase = new GetServicesUseCase(serviceRepository);
  const getServicesForMarketplaceUseCase = new GetServicesForMarketplaceUseCase(serviceRepository);

  // Provide dependencies to the app
  app.provide('getServicesUseCase', getServicesUseCase);
  app.provide('getServicesForMarketplaceUseCase', getServicesForMarketplaceUseCase);

  return {
    getServicesUseCase,
    getServicesForMarketplaceUseCase
  };
}
