import { mockStatistic } from '../../order/__mocks__/statistic.mock';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserRoleEnum } from '../enums/user-role.enum';

export const mockUsers: UserResDto[] = [
  {
    id: 1,
    name: 'John Doe',
    surname: 'Doe',
    email: 'johndoe@example.com',
    role: UserRoleEnum.MANAGER,
    active: true,
    ban: false,
    last_login: new Date('05-12-2023'),
    created_at: new Date('05-12-2023'),
    statistic: mockStatistic,
  },
];
