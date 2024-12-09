import IOrderQuery from '../interfaces/IOrderQuery';
import { OrderEnum } from '../enums/order.enum';
import { OrderByEnum } from '../enums/order-by.enum';

export const initialQuery: IOrderQuery = {
  page: 1,
  order: OrderEnum.DESC,
  orderBy: OrderByEnum.ID,
};

