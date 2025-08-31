import type {IAuthRepository} from "~~/app/core/interfaces";
import type {ApiResponse, User} from "~~/app/core/entities";


export class GetCurrentUserUseCase {
  constructor(private readonly authRepo: IAuthRepository) {}

 async execute(): Promise<ApiResponse<User>> {
    return this.authRepo.getCurrentUser();
  }
}
