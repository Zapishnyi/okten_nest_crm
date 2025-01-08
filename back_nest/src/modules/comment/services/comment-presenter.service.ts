import { Injectable } from '@nestjs/common';

import { CommentEntity } from '../../../database/entities/comment.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { CommentResDto } from '../dto/res/comment.res.dto';

@Injectable()
export class CommentPresenterService {
  public toResponseDto(
    { comment, created_at, id }: CommentEntity,
    user: UserEntity,
  ): CommentResDto {
    return {
      id,
      comment,
      author_name: user?.name,
      author_surname: user?.surname,
      created_at,
    };
  }
}
