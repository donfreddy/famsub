import type { App } from "vue";
import { HttpClientService } from "~~/app/data/services/HttpClientService";
import { OfferRepository } from "~~/app/data/repositories/OfferRepository";
import { GetOfferByIdUseCase, GetOffersByServiceUseCase } from "~~/app/core/usecases/offer";

export function setupOfferDependencies(app: App<Element>) {
  // Create services
  const { apiBaseUrl, apiKey } = useRuntimeConfig().public
  const httpClientService = new HttpClientService(apiBaseUrl, apiKey);

  // Create repositories
  const offerRepository = new OfferRepository(httpClientService.instance);

  // Create use cases
  const getOfferByIdUseCase = new GetOfferByIdUseCase(offerRepository);
  const getOffersByServiceUseCase = new GetOffersByServiceUseCase(offerRepository);

  // Provide dependencies to the app
  app.provide('getOfferByIdUseCase', getOfferByIdUseCase);
  app.provide('getOffersByServiceUseCase', getOffersByServiceUseCase);

  return {
    getOfferByIdUseCase,
    getOffersByServiceUseCase
  };
}
