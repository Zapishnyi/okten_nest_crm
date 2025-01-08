import { Module } from '@nestjs/common';

import { ActivateTokensRepository } from './services/activate-tokens-repository.service';
import { AuthTokensRepository } from './services/auth-tokens-repository.service';
import { CommentsRepository } from './services/comments-repository.service';
import { OrdersRepository } from './services/orders-repository.service';
import { UsersRepository } from './services/users-repository.service';

@Module({
  providers: [
    OrdersRepository,
    ActivateTokensRepository,
    AuthTokensRepository,
    UsersRepository,
    CommentsRepository,
  ],
  exports: [
    OrdersRepository,
    ActivateTokensRepository,
    AuthTokensRepository,
    UsersRepository,
    CommentsRepository,
  ],
})
export class RepositoryModule {}
