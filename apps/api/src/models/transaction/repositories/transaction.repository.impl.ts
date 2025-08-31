import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { TransactionRepository } from './transaction.repository';
import { Transaction } from '../entities/transaction.entity';
import { User } from '../../user/entities/user.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Offer } from '../../offer/entities/offer.entity';
import { Wallet } from '../../wallet/entities/wallet.entity';

@Injectable()
export class TransactionRepositoryImpl implements TransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}

  async create(user: User, dto: CreateTransactionDto): Promise<Transaction> {
    const newTransaction = new Transaction();
    newTransaction.user = user;
    const createdTransaction = await this.transactionRepo.save(newTransaction);
    console.log('Transaction created:', createdTransaction);
    return createdTransaction;
  }

  async findById(id: Transaction['id']): Promise<Transaction> {
    return this.transactionRepo.findOne({ where: { id } });
  }

  async findByWalletId(walletId: Wallet['id']): Promise<Transaction[]> {
    return this.transactionRepo.find({
      where: { wallet: { id: walletId } },
      order: { created_at: 'DESC' },
    });
  }

  async findByOfferId(offerId: Offer['id']): Promise<Transaction[]> {
    return this.transactionRepo.find({
      where: { offer: { id: offerId } },
      order: { created_at: 'DESC' },
    });
  }

  async findAll(options: IPaginationOptions, where: FindOptionsWhere<Transaction>): Promise<Pagination<Transaction>> {
    const transactions = await paginate(this.transactionRepo, options, {
      where,
      order: { id: 'ASC' },
    });

    // Remove the password from each user
    transactions.items.forEach((transaction) => delete transaction.user.password);

    return transactions;
  }

  async update(id: Transaction['id'], data: Partial<Transaction>): Promise<Transaction> {
    return Promise.resolve(undefined);
  }

  async remove(id: Transaction['id']): Promise<void> {
    return Promise.resolve(undefined);
  }

  async countTransactions(): Promise<number> {
    return this.transactionRepo.count();
  }
}
