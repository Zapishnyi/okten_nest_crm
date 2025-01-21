import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { CommentEntity } from '../../../database/entities/comment.entity';
import { OrderEntity } from '../../../database/entities/order.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { StatusEnum } from '../../order/enums/status.enum';
import { IsolationLevelService } from '../../transaction-isolation-level/isolation-level.service';
import { CommentReqDto } from '../dto/req/comment.req.dto';

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
  ): Promise<OrderEntity> {
    return await this.entityManager.transaction(
      this.isolationLevel.set(),
      async (em) => {
        const ordersRepositoryEM = em.getRepository(OrderEntity);
        const commentsRepositoryEM = em.getRepository(CommentEntity);
        if (
          !order.status ||
          order.status === StatusEnum.NEW ||
          !order.user?.id
        ) {
          await ordersRepositoryEM.update(
            { id: order.id },
            { user: { id: user.id }, status: StatusEnum.IN_WORK },
          );
        }
        await commentsRepositoryEM.save(
          commentsRepositoryEM.create({
            ...dto,
            user: { id: user.id },
            order: { id: order.id },
          }),
        );
        return await ordersRepositoryEM.findOne({
          where: { id: order.id },
          relations: ['user', 'group', 'comments'],
        });
      },
    );
  }
}
