import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class CommentReqDto {
  @IsString()
  @Transform(TransformHelper.trim)
  @MinLength(1, { message: 'Comment must contain at least 1 character' })
  @MaxLength(60, { message: 'Comment must be less than 60 characters' })
  @ApiProperty()
  public readonly comment: string;
}
