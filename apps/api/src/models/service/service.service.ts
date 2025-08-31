import { Injectable } from '@nestjs/common';
import { Service } from './entities/service.entity';
import { CreateServiceDto, UpdateServiceDto } from './dto/create-service.dto';
import { User } from '../user/entities/user.entity';
import { NullableType } from '../../types/nullable.type';
import { ServiceRepository } from './repositories/service.repository';
import { CreatePlanDto, UpdatePlanDto } from './dto/create-plan.dto';
import { Plan } from './entities/plan.entity';
import { Faq } from './entities/faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly serviceRepo: ServiceRepository) {}

  async create(user: User, inputs: CreateServiceDto): Promise<Service> {
    return await this.serviceRepo.create(inputs);
  }

  async findById(id: Service['id']): Promise<NullableType<Service>> {
    return this.serviceRepo.findById(id);
  }

  async findBySlug(slug: Service['slug']): Promise<NullableType<Service>> {
    return this.serviceRepo.findBySlug(slug);
  }

  async findAll(): Promise<Service[]> {
    return this.serviceRepo.findAll();
  }

  async findForMarketplace(): Promise<object[]> {
    return this.serviceRepo.findForMarketplace();
  }

  async update(id: Service['id'], data: UpdateServiceDto): Promise<Service> {
    return this.serviceRepo.update(id, data);
  }

  async remove(id: Service['id']): Promise<void> {
    return this.serviceRepo.remove(id);
  }

  async addPlan(id: Service['id'], dto: CreatePlanDto): Promise<Plan> {
    return this.serviceRepo.addPlan(id, dto);
  }

  async findPlanById(id: Service['id']): Promise<NullableType<Plan>> {
    return this.serviceRepo.findPlanById(id);
  }

  async findPlansByServiceId(serviceId: Service['id']): Promise<Plan[]> {
    return this.serviceRepo.findPlansByServiceId(serviceId);
  }

  async updatePlan(id: Service['id'], planId: Plan['id'], data: UpdatePlanDto): Promise<Plan> {
    return this.serviceRepo.updatePlan(id, planId, data);
  }

  async removePlan(id: Service['id'], planId: Plan['id']): Promise<void> {
    return this.serviceRepo.removePlan(id, planId);
  }

  async addFaq(id: Service['id'], dto: CreateFaqDto): Promise<Faq> {
    return this.serviceRepo.addFaq(id, dto);
  }

  async findFaqById(id: Faq['id']): Promise<NullableType<Faq>> {
    return this.serviceRepo.findFaqById(id);
  }

  async findFaqsByServiceId(id: Service['id']): Promise<Faq[]> {
    return this.serviceRepo.findFaqsByServiceId(id);
  }

  async updateFaq(id: Service['id'], faqId: Faq['id'], data: CreateFaqDto): Promise<Faq> {
    return this.serviceRepo.updateFaq(id, faqId, data);
  }

  async removeFaq(id: Service['id'], faqId: Faq['id']): Promise<void> {
    return this.serviceRepo.removeFaq(id, faqId);
  }

  async countServices(): Promise<number> {
    return this.serviceRepo.countServices();
  }
}
