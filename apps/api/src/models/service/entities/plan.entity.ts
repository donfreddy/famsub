import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Frequency } from '../../../common/helpers';
import { Service } from './service.entity';

@Entity({ name: 'plans' })
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', nullable: false })
  name: { [key: string]: string };

  @Column({ type: 'jsonb', nullable: false })
  description: { [key: string]: string };

  @Column({ default: 0 })
  total_amount: number;

  @Column({ type: 'jsonb', nullable: false })
  fees_amounts: {
    unit_amount_com: number;
    unit_amount_with_com: number;
    monthly: {
      unit_amount_com: number;
      unit_amount_with_com: number;
    };
  };

/*  "fees_amounts": {
    "unit_amount_com": 9.12,
    "unit_amount_with_com": 45.6,
    "monthly": {
      "unit_amount_com": 0.76,
      "unit_amount_with_com": 3.8
    }
  },*/

  @Column({ default: true })
  can_be_public: boolean;

  @Column({ type: 'enum', enum: Frequency, default: Frequency.MONTHLY })
  billing_frequency: Frequency;

  @Column({ default: 0 })
  max_members: number;

  @ManyToOne((): typeof Service => Service, (service) => service.plans)
  @JoinColumn({ name: 'service_id' })
  service: Service;
}
