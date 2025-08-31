import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceRepository } from './service.repository';
import { NullableType } from '../../../types/nullable.type';
import { Service } from '../entities/service.entity';
import { CreateServiceDto, UpdateServiceDto } from '../dto/create-service.dto';
import { Plan } from '../entities/plan.entity';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { CategoryService } from '../../category/category.service';
import { Faq } from '../entities/faq.entity';
import { CreateFaqDto } from '../dto/create-faq.dto';

@Injectable()
export class ServiceRepositoryImpl implements ServiceRepository {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
    @InjectRepository(Plan)
    private readonly planRepo: Repository<Plan>,
    @InjectRepository(Faq)
    private readonly faqRepo: Repository<Faq>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(dto: CreateServiceDto): Promise<Service> {
    const { category_id, ...serviceData } = dto;
    const category = await this.categoryService.findById(category_id);
    const slug = serviceData.name.toLowerCase().replace(/\s+/g, '-');
    return this.serviceRepo.save(this.serviceRepo.create({ ...serviceData, slug, category }));
  }

  async findById(id: Service['id']): Promise<NullableType<Service>> {
    const service = await this.serviceRepo.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    return service;
  }

  async findBySlug(slug: Service['slug']): Promise<NullableType<Service>> {
    const service = await this.serviceRepo.findOne({ where: { slug }, relations: ['plans', 'faqs'] });
    if (!service) {
      throw new NotFoundException(`Service with slug ${slug} not found`);
    }
    return service;
  }

  async findAll(): Promise<Service[]> {
    return this.serviceRepo.find({
      relations: ['plans', 'faqs'],
      order: { created_at: 'DESC' },
    });
  }

  async findForMarketplace(): Promise<object[]> {
    const servicesResult = await this.serviceRepo.find();

    return servicesResult.map((service) => {
      // Map the offer to include only the necessary fields
      return {
        ..._.pick(service, ['id', 'name', 'slug', 'service_url', 'background_color', 'category']),
        total_count: 143,
        offers: {
          total: 143,
          starting_price: 1000,
          max_price: 3000,
          currency: 'XAF',
        },
      };
    });
  }

  async update(id: Service['id'], data: UpdateServiceDto): Promise<Service> {
    const service = await this.findById(id);
    return this.serviceRepo.update(service.id, data).then(() => {
      return this.serviceRepo.findOne({ where: { id } });
    });
  }

  async remove(id: Service['id']): Promise<void> {
    const service = await this.findById(id);
    await this.serviceRepo.remove(service);
  }

  async addPlan(id: Service['id'], dto: CreatePlanDto): Promise<Plan> {
    const service = await this.findById(id);
    const plan = this.planRepo.create({ ...dto, service });
    return await this.planRepo.save(plan);
  }

  async findPlanById(id: Plan['id']): Promise<NullableType<Plan>> {
    const plan = await this.planRepo.findOne({ where: { id } });
    if (!plan) {
      throw new NotFoundException(`Plan with id ${id} not found`);
    }
    return plan;
  }

  async findPlansByServiceId(serviceId: Service['id']): Promise<Plan[]> {
    return await this.planRepo.find({
      where: { service: { id: serviceId } },
    });
  }

  async updatePlan(id: Service['id'], planId: Plan['id'], data: CreatePlanDto): Promise<Plan> {
    const plan = await this.findPlanById(planId);
    return this.planRepo.update(plan.id, data).then(() => {
      return this.planRepo.findOne({ where: { id: plan.id } });
    });
  }

  async removePlan(id: Service['id'], planId: Plan['id']): Promise<void> {
    const plan = await this.findPlanById(planId);
    await this.planRepo.remove(plan);
  }

  async addFaq(id: Service['id'], dto: CreateFaqDto): Promise<any> {
    const service = await this.findById(id);
    const savedFaq = await this.faqRepo.save(this.faqRepo.create({ ...dto, service }));
    return _.pick(savedFaq, ['id', 'question', 'answer']);
  }

  async findFaqById(id: Faq['id']): Promise<NullableType<Faq>> {
    const faq = await this.faqRepo.findOne({ where: { id } });
    if (!faq) {
      throw new NotFoundException(`FAQ with id ${id} not found`);
    }
    return faq;
  }

  async findFaqsByServiceId(id: Service['id']): Promise<Faq[]> {
    const service = await this.findById(id);
    return service.faqs;
  }

  async updateFaq(id: Service['id'], faqId: Faq['id'], data: CreateFaqDto): Promise<Faq> {
    const faq = await this.findFaqById(faqId);
    return this.faqRepo.update(faq.id, data).then(() => {
      return this.faqRepo.findOne({ where: { id: faqId } });
    });
  }

  async removeFaq(id: Service['id'], faqId: Faq['id']): Promise<void> {
    const faq = await this.findFaqById(faqId);
    await this.faqRepo.remove(faq);
  }

  async countServices(): Promise<number> {
    return this.serviceRepo.count();
  }
}
