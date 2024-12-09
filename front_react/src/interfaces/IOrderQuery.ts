import { SortByEnum } from '../enums/sort-by.enum';
import { SortEnum } from '../enums/sort.enum';


export default interface IOrderQuery {
  page: number;
  sortBy: SortByEnum;
  sort: SortEnum;

}