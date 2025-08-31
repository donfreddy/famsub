import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletRepository } from './wallet.repository';
import { NullableType } from '../../../types/nullable.type';
import { Wallet } from '../entities/wallet.entity';
import { User } from 'src/models/user/entities/user.entity';

@Injectable()
export class WalletRepositoryImpl implements WalletRepository {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,
  ) {}

  async create(user: User, currency?: string): Promise<Wallet> {
    return this.walletRepo.save(this.walletRepo.create({ user, currency }));
  }

  async findById(id: Wallet['id']): Promise<NullableType<Wallet>> {
    const wallet = await this.walletRepo.findOne({ where: { id } });
    if (!wallet) {
      throw new NotFoundException(`Wallet with id ${id} not found`);
    }
    return wallet;
  }

  async findAll(): Promise<Wallet[]> {
    return this.walletRepo.find();
  }

  async update(id: Wallet['id'], data: Partial<Wallet>): Promise<Wallet> {
    const category = await this.findById(id);
    return this.walletRepo.update(category.id, data).then(() => {
      return this.walletRepo.findOne({ where: { id } });
    });
  }

  async remove(id: Wallet['id']): Promise<void> {
    const category = await this.findById(id);
    await this.walletRepo.remove(category);
  }

  deposit(user: User, amount: number): Promise<any> {
    throw new Error('Method not implemented.');
  }

  withdraw(user: User, amount: number): Promise<any> {
    throw new Error('Method not implemented.');
  }

  transfer(sender: User, receiver: User, amount: number): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async getBalance(user: User): Promise<Wallet> {
    return this.walletRepo.findOne({ where: { user: { id: user.id } } });
  }
}
