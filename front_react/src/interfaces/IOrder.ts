import ICommentResponse from './ICommentResponse';

export default interface IOrder {
  id: number,
  name: string,
  surname: string,
  email: string,
  phone: string,
  age: number,
  course: string,
  course_format: string,
  course_type: string,
  sum: number,
  alreadyPaid: number,
  utm: string,
  msg: string,
  status: string,
  group: string
  created_at: Date,
  manager: string,
  comments: ICommentResponse[]
  manager_id: number,
}