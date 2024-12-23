import { SortEnum } from '../enums/sort.enum';
import { UsersSortByEnum } from '../enums/users-sort-by.enum';


export const initialUsersQuery: Record<string, SortEnum | UsersSortByEnum> = {
  sort: SortEnum.DESC,
  sortBy: UsersSortByEnum.ID,
};

