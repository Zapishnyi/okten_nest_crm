import { OrdersSortByEnum } from '../enums/orders-sort-by.enum';
import { SortEnum } from '../enums/sort.enum';


export const initialOrdersQuery: Record<string, number | SortEnum | OrdersSortByEnum> = {
  page: 1,
  sort: SortEnum.DESC,
  sortBy: OrdersSortByEnum.ID,
};

