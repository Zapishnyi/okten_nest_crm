import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseModel } from './base/base.model';
import { AuthTokenEntity } from './auth-token.entity';
import { ActivateTokenEntity } from './activate-token.entity';
import { UserRoleEnum } from '../../modules/user/enums/user-role.enum';
import { OrderEntity } from './order.entity';
import { CommentEntity } from './comment.entity';

@Entity('users')
export class UserEntity extends BaseModel {
  @Column('varchar', { length: 25, nullable: false })
  name: string;

  @Column('varchar', { length: 25, nullable: false })
  surname: string;

  @Column('varchar', { length: 100, unique: true, nullable: true })
  email: string;

  @Column('varchar', { length: 60, nullable: true, select: false })
  password: string;

  @Column('boolean', { default: false })
  active: boolean;

  @Column('boolean', { default: false })
  ban: boolean;

  @Column('enum', { enum: UserRoleEnum })
  role: UserRoleEnum;

  @OneToMany(() => AuthTokenEntity, (entity) => entity.user)
  auth_tokens?: AuthTokenEntity[];

  @OneToOne(() => ActivateTokenEntity, (entity) => entity.user)
  activate_token?: ActivateTokenEntity;

  @OneToMany(() => OrderEntity, (entity) => entity.user)
  orders: OrderEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.order)
  comments: CommentEntity[];
}
