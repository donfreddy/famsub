import { Column, CreateDateColumn, JoinColumn, ManyToOne, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { PaymentMethod, TransactionStatus, TransactionType } from '../../../common/helpers';
import { Wallet } from '../../wallet/entities/wallet.entity';
import { Offer } from '../../offer/entities/offer.entity';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal' })
  amount: number;

  @Column()
  currency: string;

  @Column({ type: 'enum', enum: Object.values(TransactionType) })
  type: TransactionType;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  external_reference?: string;

  @ManyToOne((): typeof User => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Wallet, (wallet) => wallet.id, { nullable: true })
  @JoinColumn({ name: 'wallet_id' })
  wallet?: Wallet;

  @ManyToOne(() => Offer, (offer) => offer.id, { nullable: true })
  @JoinColumn({ name: 'offer_id' })
  offer?: Offer;

  @Column({ type: 'enum', enum: Object.values(PaymentMethod) })
  payment_method: PaymentMethod;

  @Column({ type: 'enum', enum: Object.values(TransactionStatus), default: TransactionStatus.PENDING })
  status: TransactionStatus;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  created_at: Date;
}
