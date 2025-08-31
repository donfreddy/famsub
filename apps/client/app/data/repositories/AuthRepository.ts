import type {AxiosInstance} from "axios";
import type {IAuthRepository} from "~~/app/core/interfaces";
import type {ApiResponse, AuthResponse, LoginCredentials, RegisterCredentials, User} from "~~/app/core/entities";

export class AuthRepository implements IAuthRepository {
  constructor(private readonly httpClient: AxiosInstance) {
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    const response = await this.httpClient.post<ApiResponse<AuthResponse>>('/auth/email/login', credentials);
    return response.data;
  }

  async register(userData: RegisterCredentials): Promise<ApiResponse<AuthResponse>> {
    const response = await this.httpClient.post('/auth/email/register', userData);
    return response.data;
  }


  async logout(): Promise<void> {
    return this.httpClient.delete('/auth/logout');
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await this.httpClient.get('/v1/me');
    return response.data;
  }
}
