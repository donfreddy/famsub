import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { WalletService } from './wallet.service';
import { WalletRepository } from './repositories/wallet.repository';
import { WalletRepositoryImpl } from './repositories/wallet.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [
    {
      provide: WalletRepository,
      useClass: WalletRepositoryImpl,
    },
    WalletService,
  ],
  exports: [WalletRepository, WalletService],
})
export class WalletModule {}
