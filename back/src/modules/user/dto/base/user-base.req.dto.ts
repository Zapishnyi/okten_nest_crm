import { UserRoleEnum } from '../../enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { regexp } from '../../constants/regexp';

export class UserBaseReqDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'User name',
    format: 'string',
    minLength: 3,
    maxLength: 25,
    example: 'John',
  })
  public readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'User name',
    format: 'string',
    minLength: 3,
    maxLength: 25,
    example: 'Doe',
  })
  public readonly surname: string;

  @IsString()
  @Matches(regexp.email, { message: 'Must be a valid e-mail address' })
  @Transform(TransformHelper.trim)
  @Length(3, 100)
  @ApiProperty({
    description: 'User email',
    format: 'email',
    minLength: 3,
    maxLength: 100,
    example: 'john.doe@example.com',
  })
  public readonly email: string;

  @IsString()
  @Transform(TransformHelper.trim)
  @Length(5, 16)
  @Matches(regexp.password, {
    message:
      'Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter,' +
      'one special character, no space, and it must be 5-16 characters long.',
  })
  @ApiProperty({
    description: 'Password',
    minLength: 5,
    maxLength: 16,
    example: 'Cafe4354D$',
  })
  public readonly password: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Is account activated?',
    example: 'false',
    default: false,
  })
  public readonly active: boolean;

  @IsBoolean()
  @ApiProperty({
    description: 'Is account banned?',
    example: 'false',
    default: false,
  })
  public readonly ban: boolean;

  @IsString()
  @Transform(TransformHelper.trim)
  @IsEnum(UserRoleEnum, {
    message: 'Role must be one of the following values: "admin", "manager"',
  })
  @ApiProperty({
    description: 'Role',
    example: UserRoleEnum.MANAGER,
    default: UserRoleEnum.MANAGER,
  })
  public readonly role: UserRoleEnum;
}
