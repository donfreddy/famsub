import {LoginUseCase, LogoutUseCase, RegisterUseCase} from "~~/app/core/usecases/auth";
import {HttpClientService} from "~~/app/data/services/HttpClientService";
import {AuthRepository} from "~~/app/data/repositories/AuthRepository";
import {GetCurrentUserUseCase} from "~~/app/core/usecases/user";

export function setupAuthDependencies(app: any) {
  // Create services
  const {apiBaseUrl, apiKey} = useRuntimeConfig().public
  const httpClientService = new HttpClientService(apiBaseUrl, apiKey);

  // Create repositories
  const authRepository = new AuthRepository(httpClientService.instance);

  // Create use cases
  const loginUseCase = new LoginUseCase(authRepository);
  const registerUseCase = new RegisterUseCase(authRepository);
  const logoutUseCase = new LogoutUseCase(authRepository);
  const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);

  // Provide dependencies to the app
  app.provide('loginUseCase', loginUseCase);
  app.provide('registerUseCase', registerUseCase);
  app.provide('logoutUseCase', logoutUseCase);
  app.provide('getCurrentUserUseCase', getCurrentUserUseCase);

  return {
    loginUseCase,
    registerUseCase,
    logoutUseCase,
    getCurrentUserUseCase,
  };
}
