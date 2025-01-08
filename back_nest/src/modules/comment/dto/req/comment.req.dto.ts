import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class CommentReqDto {
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty()
  public readonly comment: string;
}
