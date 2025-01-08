import * as process from 'node:process';

import { IsolationLevelsEnum } from '../modules/transaction-isolation-level/enums/isolationLevels.enum';
import { UserRoleEnum } from '../modules/user/enums/user-role.enum';
import { EnvConfigType } from './envConfigType';

export default (): EnvConfigType => ({
  app: {
    port: Number(process.env.APP_PORT) /*|| 3000*/,
    host: process.env.APP_HOST /*|| '0.0.0.0'*/,
  },
  admin: {
    name: process.env.ADMIN_NAME,
    surname: process.env.ADMIN_SURNAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    active: JSON.parse(process.env.ADMIN_ACTIVE),
    role: process.env.ADMIN_ROLE as UserRoleEnum,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpire: Number(process.env.JWT_ACCESS_EXPIRE),
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpire: Number(process.env.JWT_REFRESH_EXPIRE),
    activateSecret: process.env.JWT_ACTIVATE_SECRET,
    activateExpire: Number(process.env.JWT_ACTIVATE_EXPIRE),
  },

  mysql: {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    transactionIsolationLevel: process.env
      .MYSQL_TRANSACTION_ISOLATION_LEVEL as IsolationLevelsEnum,
  },
});
