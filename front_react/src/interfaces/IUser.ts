import { UserRoleEnum } from '../enums/user-role.enum';

export default interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  active: boolean;
  ban: boolean;
  role: UserRoleEnum;
  last_login: string;
  created_at: string;
}