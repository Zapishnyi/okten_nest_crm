import { CourseFormatEnum } from '../enums/course-format.enum';
import { CourseTypeEnum } from '../enums/course-type.enum';
import { CourseEnum } from '../enums/course.enum';
import { StatusEnum } from '../enums/status.enum';

export interface IOrderFilterQuery {
  name?: string | null;
  surname?: string | null;
  email?: string | null;
  phone?: string | null;
  age?: number | null;
  course?: CourseEnum | null;
  course_format?: CourseFormatEnum | null;
  course_type?: CourseTypeEnum | null;
  status?: StatusEnum | null;
  group?: string | null;
  my_orders?: boolean | null;
  upper_date?: Date | null;
  lower_date?: Date | null;
}
