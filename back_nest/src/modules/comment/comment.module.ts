import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentPresenterService } from './services/comment-presenter.service';
import { RepositoryModule } from '../repository/repository.module';
import { IsolationLevelModule } from '../transaction-isolation-level/isolation-level.module';

@Module({
  imports: [RepositoryModule, IsolationLevelModule],
  providers: [CommentService, CommentPresenterService],
  exports: [CommentService, CommentPresenterService],
})
export class CommentModule {}
