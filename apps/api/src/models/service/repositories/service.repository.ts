import { NullableType } from '../../../types/nullable.type';
import { Service } from '../entities/service.entity';
import { CreateServiceDto, UpdateServiceDto } from '../dto/create-service.dto';
import { CreatePlanDto, UpdatePlanDto } from '../dto/create-plan.dto';
import { Plan } from '../entities/plan.entity';
import { Faq } from '../entities/faq.entity';
import { CreateFaqDto } from '../dto/create-faq.dto';

export abstract class ServiceRepository {
  abstract create(dto: CreateServiceDto): Promise<Service>;

  abstract findById(id: Service['id']): Promise<NullableType<Service>>;

  abstract findBySlug(id: Service['slug']): Promise<NullableType<Service>>;

  abstract findAll(): Promise<Service[]>;

  abstract findForMarketplace(): Promise<object[]>;

  abstract update(id: Service['id'], data: UpdateServiceDto): Promise<Service>;

  abstract remove(id: Service['id']): Promise<void>;

  abstract addPlan(id: Service['id'], dto: CreatePlanDto): Promise<Plan>;

  abstract findPlanById(id: Plan['id']): Promise<NullableType<Plan>>;

  abstract findPlansByServiceId(id: Service['id']): Promise<Plan[]>;

  abstract updatePlan(id: Service['id'], planId: Plan['id'], data: UpdatePlanDto): Promise<Plan>;

  abstract removePlan(id: Service['id'], planId: Plan['id']): Promise<void>;

  abstract addFaq(id: Service['id'], dto: CreateFaqDto): Promise<Faq>;

  abstract findFaqById(id: Plan['id']): Promise<NullableType<Faq>>;

  abstract findFaqsByServiceId(id: Service['id']): Promise<Faq[]>;

  abstract updateFaq(id: Service['id'], faqId: Plan['id'], data: CreateFaqDto): Promise<Faq>;

  abstract removeFaq(id: Service['id'], faqId: Faq['id']): Promise<void>;

  abstract countServices(): Promise<number>;
}
