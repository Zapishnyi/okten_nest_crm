import { OrderEnum } from '../enums/order.enum';
import { OrderByEnum } from '../enums/order-by.enum';
import IOrder from './IOrder';

export default interface IOrderPaginated {
  data: IOrder[],
  total: number,
  limit: number,
  page: number,
  pages: number,
  order: OrderEnum,
  orderBy: OrderByEnum,
}
