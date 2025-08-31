import { IsOptional, IsEnum } from 'class-validator';
import { Role, UserStatus } from 'src/common/helpers';

export class FindUsersQueryDto {
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
