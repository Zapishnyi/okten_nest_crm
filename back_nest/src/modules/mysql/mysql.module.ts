import * as path from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvConfigType, MySQLConfigType } from '../../configs/envConfigType';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (envConfig: ConfigService<EnvConfigType>) => {
        const { host, password, database, username, port } =
          envConfig.get<MySQLConfigType>('mysql');

        return {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          entities: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'database',
              'entities',
              '*.entity.js',
            ),
          ],
          migrationsRun:
            false /* automatically check and start migrations if there is any  */,
          migrations: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'database',
              'migrations',
              '*.js',
            ),
          ],
          synchronize: false, // Don't use in production, it automatically syncs your DB schema
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class MySQLModule {}
