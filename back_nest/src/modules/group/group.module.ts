import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { RepositoryModule } from '../repository/repository.module';
import { IsolationLevelModule } from '../transaction-isolation-level/isolation-level.module';
import { GroupController } from './group.controller';
import { GroupService } from './services/group.service';
import { GroupPresenterService } from './services/group-presenter.service';

@Module({
  imports: [
    forwardRef(() => IsolationLevelModule),
    AuthModule,
    RepositoryModule,
  ],
  providers: [GroupService, GroupPresenterService],
  controllers: [GroupController],
  exports: [GroupService, GroupPresenterService],
})
export class GroupModule {}
