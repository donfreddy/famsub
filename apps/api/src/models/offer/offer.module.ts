import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { ServiceModule } from '../service/service.module';
import { OfferRepository } from './repositories/offer.repository';
import { OfferRepositoryImpl } from './repositories/offer.repository.impl';
import { FilterService } from '../../common/services/filter.service';
import { VaultsController } from './vaults.controller';
import { Vault } from './entities/vault.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Vault]), ServiceModule],
  controllers: [OfferController, VaultsController],
  providers: [
    {
      provide: OfferRepository,
      useClass: OfferRepositoryImpl,
    },
    OfferService,
    FilterService,
  ],
  exports: [OfferRepository, OfferService],
})
export class OfferModule {}
