import { OrderByEnum } from '../enums/order-by.enum';
import { OrderEnum } from '../enums/order.enum';

export default interface IOrderQuery {
  page: number,
  order: OrderEnum,
  orderBy: OrderByEnum,
}