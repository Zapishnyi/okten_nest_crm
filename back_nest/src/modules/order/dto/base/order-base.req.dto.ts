import { ApiProperty } from '@nestjs/swagger';

import { CommentResDto } from '../../../comment/dto/res/comment.res.dto';
import { CourseEnum } from '../../enums/course.enum';
import { CourseFormatEnum } from '../../enums/course-format.enum';
import { CourseTypeEum } from '../../enums/course-type.enum';
import { StatusEnum } from '../../enums/status.enum';

export class OrderBaseReqDto {
  @ApiProperty({ example: 'Joe' })
  readonly name: string;
  @ApiProperty({ example: 'Doe' })
  readonly surname: string;
  @ApiProperty({ example: 'Joe.doe@example.com' })
  readonly email: string;
  @ApiProperty({ example: '+1200120012' })
  readonly phone: string;
  @ApiProperty({ example: 24 })
  readonly age: number;
  @ApiProperty({ example: CourseEnum.QACX })
  readonly course: CourseEnum;
  @ApiProperty({ example: CourseFormatEnum.ONLINE })
  readonly course_format: CourseFormatEnum;
  @ApiProperty({ example: CourseTypeEum.VIP })
  readonly course_type: CourseTypeEum;
  @ApiProperty({ example: '3353' })
  readonly sum: number;
  @ApiProperty({ example: '3353' })
  readonly alreadyPaid: number;
  @ApiProperty({ example: null })
  readonly utm: string;
  @ApiProperty({ example: null })
  readonly msg: string;
  @ApiProperty({ example: StatusEnum.IN_WORK })
  readonly status: StatusEnum;
  @ApiProperty({ example: null })
  readonly group: string;
  @ApiProperty({ example: null })
  readonly manager: string;
  @ApiProperty({ example: new Date() })
  readonly created_at: Date;
  @ApiProperty()
  readonly comments: CommentResDto[];
  @ApiProperty()
  readonly manager_id: number;
}
