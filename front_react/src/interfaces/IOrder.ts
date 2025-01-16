import { CourseFormatEnum } from '../enums/course-format.enum';
import { CourseTypeEnum } from '../enums/course-type.enum';
import { CourseEnum } from '../enums/course.enum';
import { StatusEnum } from '../enums/status.enum';

import ICommentResponse from './ICommentResponse';

export default interface IOrder {
  id: number,
  name: string,
  surname: string,
  email: string,
  phone: string,
  age: number,
  course: CourseEnum,
  course_format: CourseFormatEnum,
  course_type: CourseTypeEnum,
  sum: number,
  alreadyPaid: number,
  utm: string,
  msg: string,
  status: StatusEnum,
  group: string
  created_at: string,
  manager: string,
  comments: ICommentResponse[]
  manager_id: number,
}