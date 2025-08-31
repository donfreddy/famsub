import type {AuthRepository} from "~/core/interfaces/repositories/AuthRepository";

export class UpdateUserProfileUseCase {
  constructor(private readonly authRepo: AuthRepository) {}

 /* async execute(userId: string, userData: Partial<User>): Promise<User> {
    return this.authRepository.updateUserProfile(userId, userData);
  }*/
}