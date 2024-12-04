import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '../../enums/user-role.enum';

export class UserBanResDto {
  @ApiProperty({ description: 'User ID', format: 'int', example: 254 })
  public readonly id: number;

  @ApiProperty({
    description: 'User name',
    format: 'string',
    minLength: 3,
    maxLength: 25,
    example: 'John',
  })
  public readonly name: string;

  @ApiProperty({
    description: 'User name',
    format: 'string',
    minLength: 3,
    maxLength: 25,
    example: 'Doe',
  })
  public readonly surname: string;

  @ApiProperty({
    description: 'User email',
    format: 'email',
    minLength: 3,
    maxLength: 100,
    example: 'john.doe@example.com',
  })
  public readonly email: string;

  @ApiProperty({
    description: 'Is account activated?',
    example: 'false',
    default: false,
  })
  public readonly active: boolean;

  @ApiProperty({
    description: 'Is account banned?',
    example: 'true',
    default: false,
  })
  public readonly ban: boolean;

  @ApiProperty({
    description: 'Role',
    example: UserRoleEnum.MANAGER,
    default: UserRoleEnum.MANAGER,
  })
  public readonly role: UserRoleEnum;

  @ApiProperty({
    description: 'Date nad time when record made',
    example: new Date(),
  })
  public readonly created_at: Date;
}
