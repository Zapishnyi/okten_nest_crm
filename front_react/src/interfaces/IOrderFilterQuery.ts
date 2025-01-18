import { CourseFormatEnum } from '../enums/course-format.enum';
import { CourseTypeEnum } from '../enums/course-type.enum';
import { CourseEnum } from '../enums/course.enum';
import { StatusEnum } from '../enums/status.enum';

export interface IOrderFilterQuery {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  age?: number;
  course?: CourseEnum;
  course_format?: CourseFormatEnum;
  course_type?: CourseTypeEnum;
  status?: StatusEnum;
  group?: string;
  my_orders?: boolean;
}
