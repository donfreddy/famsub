import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionRepositoryImpl } from './repositories/transaction.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionController],
  providers: [
    {
      provide: TransactionRepository,
      useClass: TransactionRepositoryImpl,
    },
    TransactionService,
  ],
  exports: [TransactionRepository, TransactionService],
})
export class TransactionModule {}
