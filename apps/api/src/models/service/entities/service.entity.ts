import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Plan } from './plan.entity';
import { Faq } from './faq.entity';

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ type: 'jsonb', nullable: false })
  description: { [key: string]: string };

  @Column({ default: false })
  shared_credentials: boolean;

  @Column({ nullable: true })
  blog_url: string;

  @Column({ nullable: true })
  terms_url: string;

  @Column({ nullable: true })
  share_type: 'all' | 'selected';

  @Column({ nullable: true })
  logo_messenger_url: string;

  @Column({ nullable: true })
  logo_url: string;

  @Column({ nullable: true })
  service_url: string;

  @Column({ nullable: true })
  max_slots: number;

  @Column({ default: 0 })
  max_price: number;

  @Column({ default: 0 })
  money_recovered: number;

  @Column({ nullable: true })
  background_color: string;

  @Column({ type: 'jsonb', nullable: true })
  warning_owner: { [key: string]: string };

  @Column({ type: 'jsonb', nullable: true })
  warning_subscriber: { [key: string]: string };

  @Column({ default: false })
  has_pending_requests: boolean;

  @Column({ default: false })
  user_has_service: boolean;

  @Column({ default: false })
  already_shared: boolean;

  @Column({ default: false })
  high_demand: boolean;

  @ManyToOne((): typeof Category => Category, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany((): typeof Faq => Faq, (faq) => faq.service)
  @JoinColumn({ name: 'faq_id' })
  faqs: Faq[];

  @OneToMany((): typeof Plan => Plan, (plan) => plan.service)
  @JoinColumn({ name: 'plan_id' })
  plans: Plan[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
