import { Injectable } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from '../user/entities/user.entity';
import { TransactionRepository } from './repositories/transaction.repository';
import { NullableType } from '../../types/nullable.type';
import { Offer } from '../offer/entities/offer.entity';
import { Wallet } from '../wallet/entities/wallet.entity';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepo: TransactionRepository) {}

  async create(user: User, inputs: CreateTransactionDto): Promise<Transaction> {
    return await this.transactionRepo.create(user, inputs);
  }

  async findById(transactionId: Transaction['id']): Promise<NullableType<Transaction>> {
    return this.transactionRepo.findById(transactionId);
  }

  async findByWalletId(walletId: Wallet['id']): Promise<Transaction[]> {
    return this.transactionRepo.findByWalletId(walletId);
  }

  async findByOfferId(offerId: Offer['id']): Promise<Transaction[]> {
    return this.transactionRepo.findByOfferId(offerId);
  }

  async findAll(options: IPaginationOptions, where: FindOptionsWhere<Transaction>): Promise<Pagination<Transaction>> {
    return this.transactionRepo.findAll(options, where);
  }

  async countTransactions(): Promise<number> {
    return this.transactionRepo.countTransactions();
  }
}
