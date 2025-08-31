import { NullableType } from '../../../types/nullable.type';
import { Offer } from '../entities/Offer.entity';
import { CreateOfferDto } from '../dto/create-Offer.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { User } from '../../user/entities/user.entity';
import { FindOptionsWhere } from 'typeorm';
import { SortOptions } from '../../../common/services/filter.service';

export abstract class OfferRepository {
  abstract create(user: User, dto: CreateOfferDto): Promise<object>;

  abstract findById(id: Offer['id']): Promise<NullableType<Offer>>;

  abstract findByReference(reference: Offer['reference']): Promise<NullableType<Offer>>;

  abstract findAll(options: IPaginationOptions, where: FindOptionsWhere<Offer>): Promise<Pagination<Offer>>;

  abstract findForMarketplace(
    serviceSlug: string,
    options: IPaginationOptions,
    where: FindOptionsWhere<Offer>,
    sortOptions?: SortOptions,
  ): Promise<object>;

  abstract findAllByUserId(userId: User['id']): Promise<Offer[]>;

  abstract remove(id: Offer['id']): Promise<void>;

  abstract setCollectionDate(id: Offer['id'], dayCollectionDate: number): Promise<object>;

  abstract increaseReservedSlots(id: Offer['id']): Promise<object>;

  abstract decreaseReservedSlots(id: Offer['id']): Promise<object>;

  abstract toggleStatus(id: Offer['id']): Promise<object>;

  abstract countOffers(): Promise<number>;
}
