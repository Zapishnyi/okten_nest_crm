import { Column, Entity, OneToMany } from 'typeorm';

import { BaseModel } from './base/base.model';
import { OrderEntity } from './order.entity';

@Entity('groups')
export class GroupEntity extends BaseModel {
  @Column('varchar', { length: 25, nullable: false, unique: true })
  name: string;
  @OneToMany(() => OrderEntity, (entity) => entity.group)
  orders: OrderEntity[];
}
