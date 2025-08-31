import type {IAuthRepository} from "~~/app/core/interfaces";

export class LogoutUseCase {
  constructor(private readonly authRepo: IAuthRepository) {}

  async execute(): Promise<void> {
   return this.authRepo.logout();
  }
}
