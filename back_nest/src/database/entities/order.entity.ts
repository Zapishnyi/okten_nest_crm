import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { CourseEnum } from '../../modules/order/enums/course.enum';
import { CourseFormatEnum } from '../../modules/order/enums/course-format.enum';
import { CourseTypeEnum } from '../../modules/order/enums/course-type.enum';
import { StatusEnum } from '../../modules/order/enums/status.enum';
import { BaseModel } from './base/base.model';
import { CommentEntity } from './comment.entity';
import { GroupEntity } from './group.entity';
import { UserEntity } from './user.entity';

@Entity('orders')
export class OrderEntity extends BaseModel {
  @Column('varchar', { length: 25, nullable: true, default: null })
  name: string;

  @Column('varchar', { length: 25, nullable: true, default: null })
  surname: string;

  @Column('varchar', { length: 100, nullable: true, default: null })
  email: string;

  @Column('varchar', { length: 12, nullable: true, default: null })
  phone: string;

  @Column('integer', { nullable: true, default: null })
  age: number;

  @Column('varchar', { length: 10, nullable: true, default: null })
  course: CourseEnum;

  @Column('varchar', { length: 15, nullable: true, default: null })
  course_format: CourseFormatEnum;

  @Column('varchar', { length: 100, nullable: true, default: null })
  course_type: CourseTypeEnum;

  @Column('integer', { nullable: true, default: null })
  sum: number;

  @Column('integer', { nullable: true, default: null })
  alreadyPaid: number;

  @Column('varchar', { length: 100, nullable: true })
  utm: string;

  @Column('varchar', { length: 100, nullable: true })
  msg: string;

  @Column('varchar', { length: 15, nullable: true, default: null })
  status: StatusEnum;

  @ManyToOne(() => UserEntity, (entity) => entity.orders)
  user: UserEntity;

  @ManyToOne(() => GroupEntity, (entity) => entity.orders)
  group: GroupEntity;

  @OneToMany(() => CommentEntity, (entity) => entity.order)
  comments: CommentEntity[];
}
