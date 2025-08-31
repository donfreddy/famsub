import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  name: { [key: string]: string };

  @Column('jsonb')
  mkp_name: { [key: string]: string };
}
