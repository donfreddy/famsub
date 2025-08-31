import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthProvider, Gender, Role, UserStatus } from '../../../common/helpers';
import { Offer } from '../../offer/entities/offer.entity';
import { Subscription } from '../../subscription/entities/subscription.entity';

@Entity({ name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb' })
  name: { [key: string]: string };

  @Column()
  code: string;

  @Column()
  currency: string;

  @Column()
  phone_code: string;

  @Column({ default: '6 50 27 87 87' })
  phone_number_example?: string;

  @Column({ default: true })
  is_active: boolean;
}
