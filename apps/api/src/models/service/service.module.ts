import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { ServiceRepositoryImpl } from './repositories/service.repository.impl';
import { ServiceRepository } from './repositories/service.repository';
import { ServicesController } from './services.controller';
import { Plan } from './entities/plan.entity';
import { CategoryModule } from '../category/category.module';
import { Faq } from './entities/faq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, Plan, Faq]), CategoryModule],
  controllers: [ServiceController, ServicesController],
  providers: [
    {
      provide: ServiceRepository,
      useClass: ServiceRepositoryImpl,
    },
    ServiceService,
  ],
  exports: [ServiceRepository, ServiceService],
})
export class ServiceModule {}
