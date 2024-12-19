import { Injectable } from '@nestjs/common';
import { CommentReqDto } from '../dto/req/comment.req.dto';
import { UserEntity } from '../../../database/entities/user.entity';
import { OrderEntity } from '../../../database/entities/order.entity';
import { EntityManager } from 'typeorm';
import { IsolationLevelService } from '../../transaction-isolation-level/isolation-level.service';
import { CommentEntity } from '../../../database/entities/comment.entity';
import { StatusEnum } from '../../order/enums/status.enum';

@Injectable()
export class CommentService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly isolationLevel: IsolationLevelService,
  ) {}

  public async addComment(
    dto: CommentReqDto,
    user: UserEntity,
    order: OrderEntity,
  ): Promise<any> {
    return await this.entityManager.transaction(
      this.isolationLevel.set(),
      async (em) => {
        const orderRepositoryEM = em.getRepository(OrderEntity);
        const commentsRepositoryEM = em.getRepository(CommentEntity);
        await orderRepositoryEM.update(
          { id: order.id },
          { user, status: StatusEnum.IN_WORK },
        );
        return commentsRepositoryEM.save(
          commentsRepositoryEM.create({
            ...dto,
            user,
            order,
          }),
        );
      },
    );
  }
}
