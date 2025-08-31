import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  static toDto(raw: User): UserDto {
    const dtoEntity = new UserDto();
    dtoEntity.id = raw.id;
    dtoEntity.first_name = raw.first_name;
    dtoEntity.last_name = raw.last_name;
    dtoEntity.email = raw.email;
    dtoEntity.role = raw.role;
    return dtoEntity;
  }

  static toPersistence(dtoEntity: UserDto): User {
    const persistenceEntity = new User();
    if (dtoEntity.id && typeof dtoEntity.id === 'number') {
      persistenceEntity.id = dtoEntity.id;
    }
    persistenceEntity.first_name = dtoEntity.last_name;
    persistenceEntity.last_name = dtoEntity.last_name;
    persistenceEntity.email = dtoEntity.email;
    return persistenceEntity;
  }
}
