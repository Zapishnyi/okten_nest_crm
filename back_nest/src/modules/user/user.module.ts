import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { OrderModule } from '../order/order.module';
import { RepositoryModule } from '../repository/repository.module';
import { IsolationLevelModule } from '../transaction-isolation-level/isolation-level.module';
import { AdminController } from './admin.controller';
import { AdminService } from './services/admin.service';
import { UserService } from './services/user.service';
import { UserPresenterService } from './services/user-presenter.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    RepositoryModule,
    IsolationLevelModule,
    OrderModule,
  ],
  controllers: [AdminController],
  providers: [UserPresenterService, UserService, AdminService],
  exports: [UserPresenterService, UserService, AdminService],
})
export class UserModule {}
