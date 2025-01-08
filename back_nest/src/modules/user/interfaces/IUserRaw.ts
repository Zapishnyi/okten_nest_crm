import { UserRoleEnum } from '../enums/user-role.enum';

export default interface IUserRaw {
  id: number;
  name: string;
  surname: string;
  email: string;
  active: boolean;
  ban: boolean;
  role: UserRoleEnum;
  last_login: Date;
  created_at: Date;
  Total: number;
  In_work: number;
  New: number;
  Agree: number;
  Disagree: number;
  Dubbing: number;
}
