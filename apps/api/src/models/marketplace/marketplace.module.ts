import { Module } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { MarketplaceController } from './marketplace.controller';
import { ServiceModule } from '../service/service.module';
import { OfferModule } from '../offer/offer.module';

@Module({
  imports: [ServiceModule, OfferModule],
  controllers: [MarketplaceController],
  providers: [MarketplaceService],
})
export class MarketplaceModule {}
