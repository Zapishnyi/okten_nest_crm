import { OrdersSortByEnum } from '../enums/orders-sort-by.enum';
import { SortEnum } from '../enums/sort.enum';


export const initialOrdersQuery: Record<string, number | SortEnum | OrdersSortByEnum> = {
  sort: SortEnum.DESC,
  page: 1,
  sortBy: OrdersSortByEnum.ID,
};

