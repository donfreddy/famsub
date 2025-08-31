import { Column, JoinColumn, ManyToOne, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'wallets' })
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { default: { total: 0, available: 0, incoming: 0 } })
  balance: {
    total: number;
    available: number;
    incoming: number;
  };

  @Column({ default: 'XAF' })
  currency: string;

  @ManyToOne((): typeof User => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ default: false })
  auto_wire_transfer: boolean;

  @Column({ default: 15 })
  auto_wire_transfer_date: number;

  @CreateDateColumn()
  created_at: Date;
}
