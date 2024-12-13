import IOrder from '../interfaces/IOrder';
import IOrderReduced from '../interfaces/IOrderReduced';

export const orderToReduced = (order: IOrder): IOrderReduced => ({
  id: order.id,
  name: order.name,
  surname: order.surname,
  email: order.email,
  phone: order.phone,
  age: order.age,
  course: order.course,
  course_format: order.course_format,
  course_type: order.course_type,
  sum: order.sum,
  alreadyPaid: order.alreadyPaid,
  status: order.status,
  group: order.group,
  created_at: order.created_at,
  manager: order.manager,
});