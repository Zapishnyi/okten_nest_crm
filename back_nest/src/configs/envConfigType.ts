import { IsolationLevelsEnum } from '../modules/transaction-isolation-level/enums/isolationLevels.enum';
import { UserRoleEnum } from '../modules/user/enums/user-role.enum';

export type EnvConfigType = {
  app: AppConfigType;
  jwt: JWTConfigType;
  mysql: MySQLConfigType;
  admin: AdminConfigType;
};

export type AppConfigType = {
  port: number;
  host: string;
};

export type AdminConfigType = {
  name: string;
  surname: string;
  email: string;
  password: string;
  active: boolean;
  role: UserRoleEnum;
};

export type MySQLConfigType = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  transactionIsolationLevel: IsolationLevelsEnum;
};

export type JWTConfigType = {
  accessSecret: string;
  accessExpire: number;
  refreshSecret: string;
  refreshExpire: number;
  activateSecret: string;
  activateExpire: number;
};
