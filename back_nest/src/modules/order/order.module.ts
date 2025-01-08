import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CommentModule } from '../comment/comment.module';
import { RepositoryModule } from '../repository/repository.module';
import { IsolationLevelModule } from '../transaction-isolation-level/isolation-level.module';
import { OrderController } from './order.controller';
import { OrderService } from './services/order.service';
import { OrderPresenterService } from './services/order-presenter.service';

@Module({
  imports: [
    RepositoryModule,
    forwardRef(() => AuthModule),
    IsolationLevelModule,
    CommentModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderPresenterService],
  exports: [OrderService, OrderPresenterService],
})
export class OrderModule {}
