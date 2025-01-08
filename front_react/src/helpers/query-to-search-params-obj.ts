import { OrdersSortByEnum } from '../enums/orders-sort-by.enum';
import { SortEnum } from '../enums/sort.enum';
import { UsersSortByEnum } from '../enums/users-sort-by.enum';

export const queryToSearchParams = (query: Record<string, number | SortEnum | UsersSortByEnum | OrdersSortByEnum>): Record<string, string> => {
  const output: Record<string, string> = {};
  for (const key in query) {
    output[key] = query[key].toString();
  }
  return output;
};