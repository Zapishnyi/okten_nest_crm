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
  @Column('varchar', { length: 25, nullable: true })
  name: string;

  @Column('varchar', { length: 25, nullable: true })
  surname: string;

  @Column('varchar', { length: 100, nullable: true })
  email: string;

  @Column('varchar', { length: 13, nullable: true })
  phone: string;

  @Column('integer', { nullable: true })
  age: number;

  @Column('enum', { enum: CourseEnum, nullable: true })
  course: CourseEnum;

  @Column('enum', { enum: CourseFormatEnum, nullable: true })
  course_format: CourseFormatEnum;

  @Column('enum', { enum: CourseTypeEnum, nullable: true })
  course_type: CourseTypeEnum;

  @Column('integer', { nullable: true })
  sum: number;

  @Column('integer', { nullable: true })
  alreadyPaid: number;

  @Column('varchar', { length: 100, nullable: true })
  utm: string;

  @Column('varchar', { length: 100, nullable: true })
  msg: string;

  @Column('enum', { enum: StatusEnum, nullable: true })
  status: StatusEnum;

  @ManyToOne(() => UserEntity, (entity) => entity.orders)
  user: UserEntity;

  @ManyToOne(() => GroupEntity, (entity) => entity.orders)
  group: GroupEntity;

  @OneToMany(() => CommentEntity, (entity) => entity.order)
  comments: CommentEntity[];
}
