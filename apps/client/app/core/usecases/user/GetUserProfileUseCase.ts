import type {AuthRepository} from "~/core/interfaces/repositories/AuthRepository";
import type {User} from "~/core/entities/User";

export class GetUserProfileUseCase {
  constructor(private readonly authRepo: AuthRepository) {}

 /* async execute(userId: string): Promise<User> {
    return this.authRepository.getUserProfile(userId);
  }*/
}