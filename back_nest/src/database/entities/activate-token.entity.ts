import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseModel } from './base/base.model';
import { UserEntity } from './user.entity';

@Entity('activate_tokens')
export class ActivateTokenEntity extends BaseModel {
  @Column('varchar', { length: 308, nullable: false })
  activate: string;

  @Column('int', { nullable: false })
  user_id: number;

  @OneToOne(() => UserEntity, (entity) => entity.activate_token)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
