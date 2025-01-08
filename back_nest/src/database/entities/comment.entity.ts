import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from './base/base.model';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';

@Entity('comments')
export class CommentEntity extends BaseModel {
  @Column('varchar', { length: 100 })
  comment: string;

  @ManyToOne(() => OrderEntity, (entity) => entity.comments)
  order: OrderEntity;

  @ManyToOne(() => UserEntity, (group) => group.comments)
  user: UserEntity;
}
