import { Injectable } from '@nestjs/common';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { User } from '../user/entities/user.entity';
import { OfferRepository } from './repositories/offer.repository';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { FindOptionsWhere } from 'typeorm';
import { NullableType } from '../../types/nullable.type';
import { SortOptions } from '../../common/services/filter.service';

@Injectable()
export class OfferService {
  constructor(private readonly offerRepo: OfferRepository) {}

  async create(user: User, dto: CreateOfferDto): Promise<object> {
    return await this.offerRepo.create(user, dto);
  }

  async findById(id: Offer['id']): Promise<NullableType<Offer>> {
    return this.offerRepo.findById(id);
  }

  async findByReference(reference: Offer['reference']): Promise<NullableType<Offer>> {
    return this.offerRepo.findByReference(reference);
  }

  async findAll(options: IPaginationOptions, where: FindOptionsWhere<Offer>): Promise<Pagination<Offer>> {
    return this.offerRepo.findAll(options, where);
  }

  async findForMarketplace(
    serviceSlug: string,
    options: IPaginationOptions,
    where?: FindOptionsWhere<Offer>,
    sortOptions?: SortOptions,
  ): Promise<object> {
    return this.offerRepo.findForMarketplace(serviceSlug, options,where, sortOptions);
  }

  async findAllByUserId(userId: User['id']): Promise<Offer[]> {
    return this.offerRepo.findAllByUserId(userId);
  }

  async remove(id: Offer['id']): Promise<void> {
    return this.offerRepo.remove(id);
  }

  async setCollectionDate(id: Offer['id'], dayCollectionDate: number): Promise<object> {
    return this.offerRepo.setCollectionDate(id, dayCollectionDate);
  }

  async increaseReservedSlots(id: Offer['id']): Promise<object> {
    return this.offerRepo.increaseReservedSlots(id);
  }

  async decreaseReservedSlots(id: Offer['id']): Promise<object> {
    return this.offerRepo.decreaseReservedSlots(id);
  }

  async toggleStatus(id: Offer['id']): Promise<object> {
    return this.offerRepo.toggleStatus(id);
  }

  async countOffers(): Promise<number> {
    return this.offerRepo.countOffers();
  }
}
