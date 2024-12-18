import { Module } from '@nestjs/common';

import { RepositoryModule } from '../repository/repository.module';
import { OrderController } from './order.controller';
import { OrderService } from './services/order.service';
import { OrderPresenterService } from './services/order-presenter.service';
import { AuthModule } from '../auth/auth.module';
import { IsolationLevelModule } from '../transaction-isolation-level/isolation-level.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [RepositoryModule, AuthModule, IsolationLevelModule, CommentModule],
  controllers: [OrderController],
  providers: [OrderService, OrderPresenterService],
})
export class OrderModule {}
