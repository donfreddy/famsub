import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import * as _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferRepository } from './offer.repository';
import { NullableType } from '../../../types/nullable.type';
import { Offer } from '../entities/offer.entity';
import { ServiceService } from '../../service/service.service';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { User } from '../../user/entities/user.entity';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { randomBytes } from 'crypto';
import { Frequency, OfferStatus } from '../../../common/helpers';
import { FilterService, SortOptions } from '../../../common/services/filter.service';

@Injectable()
export class OfferRepositoryImpl implements OfferRepository {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepo: Repository<Offer>,
    private readonly serviceService: ServiceService,
    private readonly filterService: FilterService,
  ) {}

  async create(user: User, dto: CreateOfferDto): Promise<object> {
    const { plan_id, service_id, ...offerData } = dto;
    const plan = await this.serviceService.findPlanById(plan_id);
    const service = await this.serviceService.findById(service_id);

    const reference = randomBytes(8).toString('hex');
    console.log(reference);

    //const unitPrice = Math.floor(plan.total_amount / plan.max_members);
    const unitPrice = 850;

    const newOffer = new Offer();
    newOffer.title = {
      en: plan ? `${service.name} ${plan.name.en}` : offerData.title,
      fr: plan ? `${service.name} ${plan.name.fr}` : offerData.title,
    };
    newOffer.reference = reference;
    newOffer.original_price = plan.total_amount;
    newOffer.unit_price = unitPrice;
    newOffer.max_members = plan.max_members;
    newOffer.available_slots = offerData.number_share;
    newOffer.taken_slots = 1; // 1 for the owner
    newOffer.reserved_slots = plan.max_members - (offerData.number_share + 1);
    newOffer.status = offerData.status;
    newOffer.country = user.country?.code || 'FR'; // Default to 'FR' if the user country is not set
    newOffer.owner = user;
    newOffer.plan = plan;
    newOffer.service = service;
    newOffer.service = service;
    newOffer.potential_saved_amount = unitPrice * offerData.number_share;
    newOffer.paid_amount = plan.total_amount;
    newOffer.contact_number_verified = user.phone_verified;
    newOffer.can_be_public = plan.can_be_public;
    newOffer.can_change_status = false;
    newOffer.auto_accept = !service.shared_credentials;
    newOffer.credentials = {
      has_to_be_specified: service.shared_credentials,
      confirmed: false,
      login_to_confirm: false,
    };
    newOffer.collection_date = {
      day: offerData.frequency === Frequency.MONTHLY ? 0 : null,
      month: offerData.frequency === Frequency.YEARLY ? 0 : null,
      frequency: offerData.frequency,
    };
    newOffer.pricing_date = new Date();
    newOffer.mkp_fees_amount = plan.fees_amounts.monthly.unit_amount_com;

    await this.offerRepo.save(newOffer);
    return { offer: newOffer.id };
  }

  async findById(id: Offer['id']): Promise<NullableType<Offer>> {
    const service = await this.offerRepo.findOne({
      where: { id },
      relations: ['owner', 'plans', 'service', 'subscribers'],
    });
    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    return service;
  }

  async findByReference(reference: Offer['reference']): Promise<NullableType<Offer>> {
    const service = await this.offerRepo.findOne({
      where: { reference },
      relations: ['owner', 'plans', 'service', 'subscribers'],
    });
    if (!service) {
      throw new NotFoundException(`Service with id ${reference} not found`);
    }
    return service;
  }

  async findAll(options: IPaginationOptions, where: FindOptionsWhere<Offer>): Promise<Pagination<Offer>> {
    return await paginate(this.offerRepo, options, {
      where,
      relations: ['owner', 'plans'],
      order: { id: 'ASC' },
    });
  }

  async findForMarketplace(
    serviceSlug: string,
    options: IPaginationOptions,
    where?: FindOptionsWhere<Offer>,
    sortOptions?: SortOptions,
  ): Promise<object> {
    const queryBuilder = this.offerRepo
      .createQueryBuilder('offer')
      .leftJoinAndSelect('offer.owner', 'owner')
      .leftJoin('offer.service', 'service')
      .leftJoinAndSelect('offer.plan', 'plan')
      .where('service.slug = :slug', { slug: serviceSlug })
      .andWhere('offer.status = :status', { status: OfferStatus.PUBLIC })
      .andWhere('offer.available_slots > 0');

    // Apply sorting if provided
    if (sortOptions) {
      this.filterService.applySortingToQuery(queryBuilder, sortOptions);
    }

    // Apply where conditions if provided
    if (where) {
      this.applyWhereConditions(queryBuilder, where);
    }

    const [service, paginatedOffers] = await Promise.all([
      this.serviceService.findBySlug(serviceSlug),
      paginate<Offer>(queryBuilder, options),
    ]);

    // get service
    const serviceData = {
      ..._.pick(service, [
        'id',
        'name',
        'description',
        'blog_url',
        'terms_url',
        'share_type',
        'shared_credentials',
        'warning_owner',
        'warning_subscriber',
        'max_price',
        'max_slots',
        'background_color',
        'money_recovered',
        'high_demand',
        'category',
        'plans',
        'faqs',
      ]),
      auto_accept: true,
    };

    const offers = paginatedOffers.items.map((offer) => {
      // Map the offer to include only the necessary fields
      return {
        ..._.pick(offer, [
          'id',
          'title',
          'reference',
          'original_price',
          'unit_price',
          'max_members',
          'available_slots',
          'taken_slots',
          'reserved_slots',
          'status',
          'auto_accept',
        ]),
        user_is_owner: false,
        invoice_checked: false,
        unit_amount_com: offer.plan.fees_amounts.unit_amount_com,
        service_plan: offer.plan.name,
        owner: {
          ..._.pick(offer.owner, ['id', 'first_name', 'avatar', 'score', 'created_at']),
          is_verified: offer.owner.phone_verified && offer.owner.email_verified,
          is_currently_connected: false, // todo: Implement logic to check if the user is currently connected
        },
      };
    });

    return {
      service:  serviceData,
      offers,
      meta: paginatedOffers.meta,
      links: paginatedOffers.links,
    };
  }

  async findAllByUserId(userId: User['id']): Promise<Offer[]> {
    return this.offerRepo.find({
      where: { owner: { id: userId } },
    });
  }

  async remove(id: Offer['id']): Promise<void> {
    const service = await this.findById(id);
    await this.offerRepo.remove(service);
  }

  async setCollectionDate(id: Offer['id'], dayCollectionDate: number): Promise<object> {
    const offer = await this.findById(id);
    offer.collection_date = { ...offer.collection_date, day: dayCollectionDate };
    await this.offerRepo.save(offer);
    return { success: true };
  }

  async increaseReservedSlots(id: Offer['id']): Promise<object> {
    const offer = await this.findById(id);
    if (offer.max_members <= offer.reserved_slots) {
      throw new BadRequestException('Cannot increase reserved spots beyond max participants');
    }
    await this.offerRepo.save(offer);
    return { success: true };
  }

  async decreaseReservedSlots(id: Offer['id']): Promise<object> {
    const offer = await this.findById(id);
    if (offer.reserved_slots <= 0) {
      throw new BadRequestException('Cannot decrease reserved spots below zero');
    }
    offer.reserved_slots -= 1;
    await this.offerRepo.save(offer);
    return { success: true };
  }

  async countOffers(): Promise<number> {
    return this.offerRepo.count();
  }

  async toggleStatus(id: Offer['id']): Promise<object> {
    const offer = await this.findById(id);
    offer.status = offer.status === OfferStatus.PUBLIC ? OfferStatus.PRIVATE : OfferStatus.PUBLIC;
    await this.offerRepo.save(offer);
    return { success: true };
  }

  /**
   * Helper method to apply where conditions from FindOptionsWhere to query builder
   */
  private applyWhereConditions(queryBuilder: any, where: FindOptionsWhere<Offer>): void {
    // Convert FindOptionsWhere to query builder conditions
    Object.entries(where).forEach(([key, value]) => {
      // Handle nested conditions (like service.name)
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          queryBuilder.andWhere(`${key}.${nestedKey} = :${key}_${nestedKey}`, {
            [`${key}_${nestedKey}`]: nestedValue,
          });
        });
      } else {
        queryBuilder.andWhere(`offer.${key} = :${key}`, { [key]: value });
      }
    });
  }
}
