import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../models/user/entities/user.entity';

@Entity({ name: 'keystores' })
export class Keystore {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  readonly client: User;

  @Column()
  readonly primary_key: string;

  @Column()
  readonly secondary_key: string;

  @Column({ nullable: true })
  readonly browser: string;

  @Column({ nullable: true })
  readonly device: string;

  @Column({ nullable: true })
  readonly location: string;

  @Column({ default: true })
  readonly status: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
