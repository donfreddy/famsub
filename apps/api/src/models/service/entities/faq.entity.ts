import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FaqType } from '../../../common/helpers';
import { Service } from './service.entity';

@Entity({ name: 'faqs' })
export class Faq {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', nullable: false })
  question: { [key: string]: string };

  @Column({ type: 'jsonb', nullable: false })
  answer: { [key: string]: string };

  @Column({ type: 'enum', enum: FaqType })
  type: FaqType;

  @ManyToOne((): typeof Service => Service, (service) => service.faqs)
  @JoinColumn({ name: 'service_id' })
  service: Service;
}
