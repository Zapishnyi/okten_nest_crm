import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class CommentReqDto {
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty()
  comment: string;
}
