import { UserActivateResDto } from '../dto/res/user-activate.res.dto';
import { UserRoleEnum } from '../enums/user-role.enum';

export const mockUserActivate: UserActivateResDto = {
  activateToken: 'token',
  user: {
    id: 1,
    name: 'John Doe',
    surname: 'Doe',
    email: 'johndoe@example.com',
    role: UserRoleEnum.MANAGER,
    active: false,
    ban: false,
    last_login: null,
    created_at: new Date('05-12-2023'),
  },
};
