import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from './base/base.model';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';

@Entity('comments')
export class CommentEntity extends BaseModel {
  @Column('varchar', { length: 100 })
  comment: string;

  @ManyToOne(() => OrderEntity, (entity) => entity.comments, {
    onDelete: 'CASCADE', // Ensures that this comment is deleted if the related order is deleted
  })
  order: OrderEntity;

  @ManyToOne(() => UserEntity, (group) => group.comments)
  user: UserEntity;
}
