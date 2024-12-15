import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base/base.model';
import { UserEntity } from './user.entity';
import { GroupEntity } from './group.entity';
import { CommentEntity } from './comment.entity';

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

  @ManyToOne(() => UserEntity, (entity) => entity.orders)
  user: UserEntity;

  @ManyToOne(() => GroupEntity, (entity) => entity.orders)
  group: GroupEntity;

  @OneToMany(() => CommentEntity, (entity) => entity.order)
  comments: CommentEntity[];
}
