import { UserRoleEnum } from '../enums/user-role.enum';

import IOrdersStatusStatistic from './IOrdersStatusStatistic';

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
  statistic: IOrdersStatusStatistic;
}