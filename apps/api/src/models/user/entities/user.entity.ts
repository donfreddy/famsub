import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthProvider, Gender, Role, UserStatus } from '../../../common/helpers';
import { Offer } from '../../offer/entities/offer.entity';
import { Subscription } from '../../subscription/entities/subscription.entity';
import { Country } from './country.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ type: String, unique: true, nullable: true })
  email: string | null;

  @Column({ nullable: true })
  password?: string;

  @Column({ type: 'enum', enum: Object.values(AuthProvider), default: AuthProvider.EMAIL })
  provider: AuthProvider;

  @Index()
  @Column({ type: String, nullable: true })
  provider_id?: string | null;

  @Column({ nullable: true })
  contact_number?: string;

  @Column({
    type: 'enum',
    enum: Object.values(Gender),
    default: Gender.UNSPECIFIED,
  })
  gender: Gender;

  @Column({ type: 'enum', enum: Object.values(Role) })
  role: Role;

  @Column({ default: false })
  email_verified: boolean;

  @Column({ default: false })
  phone_verified: boolean;

  @Column({ nullable: true })
  avatar?: string;

  @ManyToOne((): typeof Country => Country, { nullable: true })
  country?: Country;

  @Column({ default: 0 })
  score?: number;

  @Column({ nullable: true })
  pin_code?: string;

  @Column({ nullable: true })
  birthdate?: Date;

  @Column({ type: 'enum', enum: Object.values(UserStatus), default: UserStatus.ACTIVE })
  status?: UserStatus;

  @OneToMany((): typeof Offer => Offer, (offer: Offer): User => offer.owner)
  offers: Offer[];

  @OneToMany((): typeof Subscription => Subscription, (sub: Subscription): User => sub.user)
  subscriptions: Subscription[];

  @Column({ nullable: true })
  banned_reason?: string;

  @Column({ type: 'jsonb', nullable: true })
  language: {
    code: string;
    name: { [key: string]: string };
  };

  @Column({
    type: 'jsonb',
    default: { browser: false, contact_number: false, email: true },
  })
  notification_option: {
    browser: boolean;
    contact_number: boolean;
    email: boolean;
  };

  @Column({ type: 'jsonb', default: { has_offers: false } })
  account_deletion_condition: {
    has_offers: boolean;
  };

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
