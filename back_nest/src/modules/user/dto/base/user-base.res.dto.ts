import { ApiProperty } from '@nestjs/swagger';

import { OrderResDto } from '../../../order/dto/res/order.res.dto';
import { UserRoleEnum } from '../../enums/user-role.enum';

export class UserBaseResDto {
  @ApiProperty({ description: 'User ID', format: 'int', example: 254 })
  readonly id: number;

  @ApiProperty({
    description: 'User name',
    format: 'string',
    minLength: 1,
    maxLength: 25,
    example: 'John',
  })
  readonly name: string;

  @ApiProperty({
    description: 'User name',
    format: 'string',
    minLength: 1,
    maxLength: 25,
    example: 'Doe',
  })
  readonly surname: string;

  @ApiProperty({
    description: 'User email',
    format: 'email',
    minLength: 3,
    maxLength: 100,
    example: 'john.doe@example.com',
  })
  readonly email: string;

  @ApiProperty({
    description: 'Is account activated?',
    example: 'false',
    default: false,
  })
  readonly active: boolean;

  @ApiProperty({
    description: 'Is account banned?',
    example: 'false',
    default: false,
  })
  readonly ban: boolean;

  @ApiProperty({
    description: 'Role',
    example: UserRoleEnum.MANAGER,
    default: UserRoleEnum.MANAGER,
  })
  readonly role: UserRoleEnum;

  @ApiProperty({
    description: 'Date nad time when user last login',
    example: new Date(),
  })
  readonly last_login: Date;

  @ApiProperty({
    description: 'Date nad time when user created',
    example: new Date(),
  })
  readonly created_at: Date;

  @ApiProperty({
    description: 'Orders which taken by user',
  })
  orders: OrderResDto[];
}
