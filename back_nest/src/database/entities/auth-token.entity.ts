import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from './base/base.model';
import { UserEntity } from './user.entity';

// @Index(['deviceId', 'userId']) /* indexing by several fields*/
@Entity('auth_tokens')
export class AuthTokenEntity extends BaseModel {
  @Column('varchar', { length: 308, nullable: false })
  access: string;

  @Column('varchar', { length: 308, nullable: false })
  refresh: string;

  @Column('varchar', { nullable: false })
  device: string;

  @Column('int', { nullable: false })
  user_id: number;

  @ManyToOne(() => UserEntity, (entity) => entity.auth_tokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
