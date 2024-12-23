import { SortEnum } from '../enums/sort.enum';
import { UsersSortByEnum } from '../enums/users-sort-by.enum';


export default interface IUserQuery {
  sortBy: UsersSortByEnum;
  sort: SortEnum;
}