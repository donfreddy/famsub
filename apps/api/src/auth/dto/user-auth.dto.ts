import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { UserTokensDto } from './user-tokens.dto';
import { User } from '../../models/user/entities/user.entity';
import { UserDto } from '../../models/user/dto/user.dto';
import { UserMapper } from '../../models/user/mappers/user.mapper';

export class UserAuthDto {
  @ValidateNested()
  @IsNotEmptyObject()
  readonly user: UserDto;

  @ValidateNested()
  @IsNotEmptyObject()
  readonly tokens: UserTokensDto;

  constructor(user: User, tokens: UserTokensDto) {
    this.user = UserMapper.toDto(user);
    this.tokens = tokens;
  }
}
