import IOrder from './IOrder';
import { SortEnum } from '../enums/sort.enum';
import { OrdersSortByEnum } from '../enums/orders-sort-by.enum';

export default interface IOrderPaginated {
  data: IOrder[],
  total: number,
  limit: number,
  page: number,
  pages: number,
  sort: SortEnum,
  sortBy: OrdersSortByEnum,
}
