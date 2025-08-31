import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { FindOptionsWhere } from 'typeorm';
import { NullableType } from '../../../types/nullable.type';
import { Transaction } from '../entities/transaction.entity';
import { Offer } from '../../offer/entities/offer.entity';
import { Wallet } from '../../wallet/entities/wallet.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { User } from '../../user/entities/user.entity';

export abstract class TransactionRepository {
  abstract create(user: User, dto: CreateTransactionDto): Promise<Transaction>;

  abstract findById(id: Transaction['id']): Promise<NullableType<Transaction>>;

  abstract findByWalletId(walletId: Wallet['id']): Promise<Transaction[]>;

  abstract findByOfferId(offerId: Offer['id']): Promise<Transaction[]>;

  abstract findAll(options: IPaginationOptions, where: FindOptionsWhere<Transaction>): Promise<Pagination<Transaction>>;

  abstract update(id: Transaction['id'], data: Partial<Transaction>): Promise<Transaction>;

  abstract remove(id: Transaction['id']): Promise<void>;

  abstract countTransactions(): Promise<number>;
}
