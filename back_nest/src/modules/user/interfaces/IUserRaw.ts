import { UserRoleEnum } from '../enums/user-role.enum';

export default interface IUserRaw {
  id: number;
  name: string;
  surname: string;
  email: string;
  active: boolean;
  ban: boolean;
  role: UserRoleEnum;
  total_orders: number;
  last_login: Date;
  created_at: Date;
}
