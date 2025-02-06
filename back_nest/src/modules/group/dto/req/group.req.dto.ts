import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class GroupReqDto {
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @Matches(/^[^\s]+$/, {
    message: 'Group name must not contain spaces',
  })
  @Transform(TransformHelper.trim)
  @ApiProperty({ description: 'Group name', example: 'jan2024' })
  public readonly name: string;
}
