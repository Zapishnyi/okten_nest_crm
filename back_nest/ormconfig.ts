import * as path from 'node:path';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm'; /* import of connection to database*/

import getter from './src/configs/envConfiguration'; /* import configuration from ENV configuration*/

dotenv.config({
  path: './environments/local.env',
}); /* loads environment variables from a .env file into process.env */

// take out data from postgres ENV
const { username, password, host, port, database } = getter().mysql;

// create connection to postgres database using script in package.json
export default new DataSource({
  type: 'mysql',
  host,
  port,
  username,
  password,
  database,
  entities: [
    path.join(process.cwd(), 'src', 'database', 'entities', '*.entity.ts'),
  ],
  migrations: [
    path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts'),
  ],
  synchronize:
    false /*Must be false to avoid automatic entity's synchronization with database */,
});
