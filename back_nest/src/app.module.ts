import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { GlobalExceptionFilter } from './common/filters/global-exemption.filter';
import { AuthModule } from './modules/auth/auth.module';
import { CommentModule } from './modules/comment/comment.module';
import { EnvConnectionModule } from './modules/env-connection/env-connection.module';
import { HealthModule } from './modules/health/health.module';
import { MySQLModule } from './modules/mysql/mysql.module';
import { OrderModule } from './modules/order/order.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { IsolationLevelModule } from './modules/transaction-isolation-level/isolation-level.module';
import { UserModule } from './modules/user/user.module';
import { GroupModule } from './modules/group/group.module';

@Module({
  imports: [
    UserModule,
    EnvConnectionModule,
    MySQLModule,
    RepositoryModule,
    OrderModule,
    HealthModule,
    AuthModule,
    IsolationLevelModule,
    CommentModule,
    GroupModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
