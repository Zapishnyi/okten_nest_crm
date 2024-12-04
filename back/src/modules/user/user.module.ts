import { forwardRef, Module } from '@nestjs/common';
import { UserPresenterService } from './services/user-presenter.service';
import { AdminController } from './controllers/admin.controller';
import { AuthModule } from '../auth/auth.module';
import { RepositoryModule } from '../repository/repository.module';
import { UserService } from './services/user.service';
import { AdminService } from './services/admin.service';

@Module({
  imports: [forwardRef(() => AuthModule), RepositoryModule],
  controllers: [AdminController],
  providers: [UserPresenterService, UserService, AdminService],
  exports: [UserPresenterService, UserService, AdminService],
})
export class UserModule {}
