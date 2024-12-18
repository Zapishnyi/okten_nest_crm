import { Module } from '@nestjs/common';

import { EnvConnectionModule } from './modules/env-connection/env-connection.module';
import { MySQLModule } from './modules/mysql/mysql.module';
import { OrderModule } from './modules/order/order.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { UserModule } from './modules/user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/global-exemption.filter';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { IsolationLevelModule } from './modules/transaction-isolation-level/isolation-level.module';
import { CommentModule } from './modules/comment/comment.module';

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
