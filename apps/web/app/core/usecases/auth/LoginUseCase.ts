import type {IAuthRepository} from "~~/app/core/interfaces";
import type {ApiResponse, AuthResponse, LoginCredentials} from "~~/app/core/entities";

export class LoginUseCase {
  constructor(private readonly authRepo: IAuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return await this.authRepo.login(credentials);
  }
}
