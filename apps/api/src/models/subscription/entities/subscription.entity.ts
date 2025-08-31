import { Column, JoinColumn, ManyToOne, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Offer } from '../../offer/entities/offer.entity';
import { SubStatus } from '../../../common/helpers';
import { Transaction } from '../../transaction/entities/transaction.entity';

@Entity({ name: 'subscriptions' })
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((): typeof User => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((): typeof Offer => Offer, (offer) => offer.subscribers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'offer_id' })
  offer: Offer;

  @Column({ type: 'enum', enum: Object.values(SubStatus), default: SubStatus.ACTIVE })
  status?: SubStatus;

  @ManyToOne((): typeof Transaction => Transaction, { nullable: true })
  @JoinColumn({ name: 'transaction_id' })
  transaction?: Transaction;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joined_at: Date;
}
