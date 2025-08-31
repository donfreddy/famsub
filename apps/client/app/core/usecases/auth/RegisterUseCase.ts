import type {ApiResponse, AuthResponse, RegisterCredentials} from "~~/app/core/entities";
import type {IAuthRepository} from "~~/app/core/interfaces";

export class RegisterUseCase {
  constructor(private readonly authRepo: IAuthRepository) {}

  async execute(userData: RegisterCredentials): Promise<ApiResponse<AuthResponse>> {
    return this.authRepo.register(userData);
  }
}
