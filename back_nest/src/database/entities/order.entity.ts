import { Column, Entity } from 'typeorm';
import { BaseModel } from './base/base.model';

@Entity('orders')
export class OrderEntity extends BaseModel {
  @Column('varchar', { length: 25 })
  name: string;

  @Column('varchar', { length: 25 })
  surname: string;

  @Column('varchar', { length: 100 })
  email: string;

  @Column('varchar', { length: 12 })
  phone: string;

  @Column('integer')
  age: number;

  @Column('varchar', { length: 10 })
  course: string;

  @Column('varchar', { length: 15 })
  course_format: string;

  @Column('varchar', { length: 100 })
  course_type: string;

  @Column('integer', { nullable: true })
  sum: number;

  @Column('integer', { nullable: true })
  alreadyPaid: number;

  @Column('varchar', { length: 100, nullable: true })
  utm: string;

  @Column('varchar', { length: 100, nullable: true })
  msg: string;

  @Column('varchar', { length: 15, nullable: true })
  status: string;
}
