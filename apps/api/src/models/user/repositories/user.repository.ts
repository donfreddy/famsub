import { User } from '../entities/user.entity';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { FindOptionsWhere } from 'typeorm';
import { NullableType } from '../../../types/nullable.type';

export abstract class UserRepository {
  abstract create(data: Omit<User, 'id' | 'status'>): Promise<User>;

  abstract findById(id: User['id']): Promise<NullableType<User>>;

  abstract findByEmail(email: User['email']): Promise<NullableType<User>>;

  abstract findByProvider(providerId: User['provider_id'], provider: User['provider']): Promise<NullableType<User>>;

  abstract update(id: User['id'], data: Partial<User>): Promise<User>;

  abstract findAll(options: IPaginationOptions, where: FindOptionsWhere<User>): Promise<Pagination<User>>;

  abstract remove(id: User['id']): Promise<void>;
}
