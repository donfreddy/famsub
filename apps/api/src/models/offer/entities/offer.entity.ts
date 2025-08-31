import { Column, CreateDateColumn, JoinColumn, ManyToOne, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Frequency, OfferStatus } from '../../../common/helpers';
import { Subscription } from '../../subscription/entities/subscription.entity';
import { Plan } from '../../service/entities/plan.entity';
import { Service } from '../../service/entities/service.entity';

@Entity({ name: 'offers' })
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  reference: string;

  @Column({ type: 'jsonb' })
  title: { [key: string]: string };

  @Column({ default: 0 })
  original_price: number;

  @Column({ default: 0 })
  unit_price: number;

  @Column({ default: 0 })
  max_members: number;

  @Column({ default: 0 })
  available_slots: number;

  @Column({ default: 0 })
  taken_slots: number;

  @Column({ default: 0 })
  reserved_slots: number;

  @Column({ default: 0 })
  pending_slots: number;

  @Column()
  country: string;

  @ManyToOne((): typeof User => User, (user) => user.offers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ManyToOne((): typeof Plan => Plan)
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @ManyToOne((): typeof Service => Service)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @OneToMany(() => Subscription, (subscription) => subscription.offer)
  subscribers: Subscription[];

  @Column({ nullable: true })
  pricing_date: Date;

  @Column({ type: 'enum', enum: OfferStatus })
  status: OfferStatus;

  @Column({ default: false })
  user_is_owner: boolean;

  @Column({ default: false })
  invoice_verified: boolean;

  @Column({ default: false })
  can_be_public: boolean;

  @Column({ default: false })
  contact_number_verified: boolean;

  @Column({ default: false })
  can_change_status: boolean;

  @Column({ default: true })
  auto_accept: boolean;

  @Column({ type: 'jsonb' })
  credentials: {
    has_to_be_specified: boolean;
    confirmed: boolean;
    login_to_confirm: boolean;
  };

  @Column({ type: 'jsonb' })
  collection_date: {
    day?: number | null;
    month?: number | null;
    frequency: Frequency;
  };

  @Column({ default: 0 })
  potential_saved_amount: number;

  @Column({ default: 0 })
  paid_amount: number;

  @Column({ default: 0 })
  total_saved_amount: number;

  @Column({ default: 0 })
  mkp_fees_amount: number;

  @Column({ nullable: true })
  last_bill_date: Date;

  @CreateDateColumn()
  created_at: Date;
}
