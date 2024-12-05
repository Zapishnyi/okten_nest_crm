import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from './base/base.model';
import { UserEntity } from './user.entity';

// @Index(['deviceId', 'userId']) /* indexing by several fields*/
@Entity('activate_tokens')
export class ActivateTokenEntity extends BaseModel {
  @Column('varchar', { length: 308, nullable: false })
  activate: string;
  // @Index() /* index speed up search in database, sorting data in special order*/
  @Column('int', { nullable: false })
  user_id: number;
  @ManyToOne(() => UserEntity, (entity) => entity.activate_tokens)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
