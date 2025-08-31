import type {ApiResponse, AuthResponse, LoginCredentials, RegisterCredentials, User} from "~~/app/core/entities";

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>>;

  register(userData: RegisterCredentials): Promise<ApiResponse<AuthResponse>>;

  logout(): Promise<void>;

  getCurrentUser(): Promise<ApiResponse<User>>;
}
