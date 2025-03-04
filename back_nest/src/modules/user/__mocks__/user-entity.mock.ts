import { UserEntity } from '../../../database/entities/user.entity';
import { UserRoleEnum } from '../enums/user-role.enum';

export const mockUserEntity: UserEntity = {
  id: 1,
  name: 'John',
  surname: 'Doe',
  email: 'johndoe@example.com',
  password: '',
  role: UserRoleEnum.MANAGER,
  active: false,
  ban: false,
  last_login: null,
  created_at: new Date('05-12-2023'),
  auth_tokens: [],
  orders: [],
  comments: [],
};
