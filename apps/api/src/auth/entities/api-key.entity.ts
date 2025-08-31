import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Permission } from '../../common/helpers';

@Entity({ name: 'api_keys' })
export class ApiKey {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ unique: true })
  readonly key: string;

  @Column()
  readonly version: number;

  @Column({ type: 'enum', enum: Object.values(Permission), array: true })
  readonly permissions: Permission[];

  @Column({ type: 'text', array: true })
  readonly comments: string[];

  @Column({ default: true })
  readonly status: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
