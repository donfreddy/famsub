import { Column, JoinColumn, ManyToOne, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Offer } from '../../offer/entities/offer.entity';
import { SubReqStatus } from '../../../common/helpers';
import { Transaction } from '../../transaction/entities/transaction.entity';

@Entity({ name: 'subscription-requests' })
export class SubscriptionRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((): typeof User => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((): typeof Offer => Offer)
  @JoinColumn({ name: 'offer_id' })
  offer: Offer;

  @Column({ type: 'enum', enum: Object.values(SubReqStatus), default: SubReqStatus.PENDING })
  status?: SubReqStatus;

  @ManyToOne((): typeof Transaction => Transaction, { nullable: true })
  @JoinColumn({ name: 'transaction_id' })
  transaction?: Transaction;

  @Column({ nullable: true })
  response_at?: Date;

  @Column({ type: 'text', nullable: true })
  comment?: string;

  @CreateDateColumn()
  created_at: Date;
}
