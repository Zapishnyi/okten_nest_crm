import { mockStatisticNull } from '../../order/__mocks__/statistic.mock';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserRoleEnum } from '../enums/user-role.enum';

export const mockUserCreateRes: UserResDto = {
  id: 1,
  name: 'John Doe',
  surname: 'Doe',
  email: 'johndoe@example.com',
  role: UserRoleEnum.MANAGER,
  active: false,
  ban: false,
  last_login: null,
  created_at: new Date('05-12-2023'),
  statistic: mockStatisticNull,
};
