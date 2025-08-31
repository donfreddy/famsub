import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { FindOptionsWhere } from 'typeorm';
import { NullableType } from '../../types/nullable.type';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async findById(userId: number): Promise<NullableType<User>> {
    return this.userRepository.findById(userId);
  }

  async findByEmail(email: string): Promise<NullableType<User>> {
    return this.userRepository.findByEmail(email);
  }

  async findByProvider(providerId: User['provider_id'], provider: User['provider']): Promise<NullableType<User>> {
    return this.userRepository.findByProvider(providerId, provider);
  }

  async update(id: number, user: User): Promise<User> {
    return this.userRepository.update(id, user);
  }

  async findProfile(userId: number) {
    return this.userRepository.findById(userId);
  }

  async findAll(options: IPaginationOptions, where: FindOptionsWhere<User>): Promise<Pagination<User>> {
    return this.userRepository.findAll(options, where);
  }
}
