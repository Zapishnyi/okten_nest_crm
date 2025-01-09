import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class GroupReqDto {
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @Transform(TransformHelper.trim)
  @ApiProperty({ description: 'Group name', example: 'jan2024' })
  public readonly name: string;
}
