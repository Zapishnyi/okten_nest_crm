import { ApiProperty } from '@nestjs/swagger';
import { CommentResDto } from '../../../comment/dto/res/comment.res.dto';
import { CourseEnum } from '../../enums/course.enum';
import { CourseFormatEnum } from '../../enums/course-format.enum';
import { CourseTypeEum } from '../../enums/course-type.enum';
import { StatusEnum } from '../../enums/status.enum';

export class OrderResDto {
  @ApiProperty({ example: '245' })
  id: number;
  @ApiProperty({ example: 'Joe' })
  name: string;
  @ApiProperty({ example: 'Doe' })
  surname: string;
  @ApiProperty({ example: 'Joe.doe@example.com' })
  email: string;
  @ApiProperty({ example: '+1200120012' })
  phone: string;
  @ApiProperty({ example: 24 })
  age: number;
  @ApiProperty({ example: CourseEnum.QACX })
  course: CourseEnum;
  @ApiProperty({ example: CourseFormatEnum.ONLINE })
  course_format: CourseFormatEnum;
  @ApiProperty({ example: CourseTypeEum.VIP })
  course_type: CourseTypeEum;
  @ApiProperty({ example: '3353' })
  sum: number;
  @ApiProperty({ example: '3353' })
  alreadyPaid: number;
  @ApiProperty({ example: null })
  utm: string;
  @ApiProperty({ example: null })
  msg: string;
  @ApiProperty({ example: StatusEnum.IN_WORK })
  status: StatusEnum;
  @ApiProperty({ example: null })
  group: string;
  @ApiProperty({ example: null })
  manager: string;
  @ApiProperty({ example: new Date() })
  created_at: Date;
  @ApiProperty()
  comments: CommentResDto[];
  @ApiProperty()
  manager_id: number;
}
