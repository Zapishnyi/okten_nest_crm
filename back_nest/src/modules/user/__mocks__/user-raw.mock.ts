import { UserRoleEnum } from '../enums/user-role.enum';
import IUserRaw from '../interfaces/IUserRaw';

export const mockUsersRaw: IUserRaw[] = [
  {
    id: 1,
    name: 'John',
    surname: 'Doe',
    email: 'johndoe@example.com',
    role: UserRoleEnum.MANAGER,
    active: true,
    ban: false,
    last_login: new Date('05-12-2023'),
    created_at: new Date('05-12-2023'),
    Total: 5,
    New: 0,
    In_work: 2,
    Agree: 0,
    Disagree: 3,
    Dubbing: 0,
  },
];
