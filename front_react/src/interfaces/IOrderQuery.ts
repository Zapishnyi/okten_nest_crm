import { OrdersSortByEnum } from '../enums/orders-sort-by.enum';
import { SortEnum } from '../enums/sort.enum';


export default interface IOrderQuery {
  page: number;
  sortBy: OrdersSortByEnum;
  sort: SortEnum;

}