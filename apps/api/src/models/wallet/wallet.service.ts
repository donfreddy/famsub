import { Injectable } from '@nestjs/common';
import { Wallet } from './entities/wallet.entity';
import { User } from '../user/entities/user.entity';
import { WalletRepository } from './repositories/wallet.repository';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepo: WalletRepository) {}

  async create(user: User): Promise<Wallet> {
    return await this.walletRepo.create(user);
  }

  async findById(id: Wallet['id']): Promise<Wallet> {
    return this.walletRepo.findById(id);
  }

  async findAll(): Promise<Wallet[]> {
    return this.walletRepo.findAll();
  }

  async update(id: Wallet['id'], data: Partial<Wallet>): Promise<Wallet> {
    return this.walletRepo.update(id, data);
  }

  async remove(id: Wallet['id']): Promise<void> {
    return this.walletRepo.remove(id);
  }

  async deposit(user: User, amount: number): Promise<any> {
    return this.walletRepo.deposit(user, amount);
  }

  async withdraw(user: User, amount: number): Promise<any> {
    return this.walletRepo.withdraw(user, amount);
  }

  async transfer(sender: User, receiver: User, amount: number): Promise<any> {
    return this.walletRepo.transfer(sender, receiver, amount);
  }

  async getBalance(user: User): Promise<Wallet> {
    return this.walletRepo.getBalance(user);
  }
}
