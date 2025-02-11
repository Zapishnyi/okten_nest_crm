import { SortEnum } from '../../order/enums/sort.enum';
import { UsersQueryReqDto } from '../dto/req/users-query.req.dto';
import { UsersSortByEnum } from '../enums/users-sort-by.enum';

export const mockUsersQuery: UsersQueryReqDto = {
  sortBy: UsersSortByEnum.ID,
  sort: SortEnum.DESC,
};
