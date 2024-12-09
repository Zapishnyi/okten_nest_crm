import IOrderQuery from '../interfaces/IOrderQuery';
import { SortByEnum } from '../enums/sort-by.enum';
import { SortEnum } from '../enums/sort.enum';


export const initialQuery: IOrderQuery = {
  page: 1,
  sort: SortEnum.DESC,
  sortBy: SortByEnum.ID,
};

