import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from './user.repository';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { AuthProvider } from '../../../common/helpers';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(data: User): Promise<User> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByProvider(providerId: string, provider: AuthProvider): Promise<User> {
    return this.usersRepository.findOne({ where: { provider_id: providerId, provider } });
  }

  remove(id: User['id']): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(id: User['id'], data: Partial<User>): Promise<User> {
    return Promise.resolve(undefined);
  }

  async findAll(options: IPaginationOptions, where: FindOptionsWhere<User>): Promise<Pagination<User>> {
    return await paginate(this.usersRepository, options, {
      where,
      order: { id: 'ASC' },
    });
  }
}
