import { NullableType } from '../../../types/nullable.type';
import { User } from '../../user/entities/user.entity';
import { Wallet } from '../entities/wallet.entity';

export abstract class WalletRepository {
  abstract create(user: User, currency?: string): Promise<Wallet>;

  abstract findById(id: Wallet['id']): Promise<NullableType<Wallet>>;

  abstract findAll(): Promise<Wallet[]>;

  abstract update(id: Wallet['id'], data: Partial<Wallet>): Promise<Wallet>;

  abstract remove(id: Wallet['id']): Promise<void>;

  abstract deposit(user: User, amount: number): Promise<any>;

  abstract withdraw(user: User, amount: number): Promise<any>;

  abstract transfer(sender: User, receiver: User, amount: number): Promise<any>;

  abstract getBalance(user: User): Promise<Wallet>;
}
