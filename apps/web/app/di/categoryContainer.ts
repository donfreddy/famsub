import { HttpClientService } from "~~/app/data/services/HttpClientService";
import { CategoryRepository } from "~~/app/data/repositories/CategoryRepository";
import { GetCategoriesUseCase } from "~~/app/core/usecases/category";

export function setupCategoryDependencies(app: any) {
  // Create services
  const { apiBaseUrl, apiKey } = useRuntimeConfig().public
  const httpClientService = new HttpClientService(apiBaseUrl, apiKey);

  // Create repositories
  const categoryRepository = new CategoryRepository(httpClientService.instance);

  // Create use cases
  const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);

  // Provide dependencies to the app
  app.provide('getCategoriesUseCase', getCategoriesUseCase);

  return { getCategoriesUseCase };
}
