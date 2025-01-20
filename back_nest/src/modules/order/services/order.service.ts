import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { GroupEntity } from '../../../database/entities/group.entity';
import { OrderEntity } from '../../../database/entities/order.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { OrdersRepository } from '../../repository/services/orders-repository.service';
import { IsolationLevelService } from '../../transaction-isolation-level/isolation-level.service';
import { OrderStatusStatisticResDto } from '../../user/dto/res/order-status-statistic.res.dto';
import { OrderReqDto } from '../dto/req/order.req.dto';
import { OrdersQueryReqDto } from '../dto/req/orders-query.req.dto';
import { StatusEnum } from '../enums/status.enum';

@Injectable()
export class OrderService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly entityManager: EntityManager,
    private readonly isolationLevel: IsolationLevelService,
  ) {}

  public async getOrdersByQuery(
    query: OrdersQueryReqDto,
    user: UserEntity,
  ): Promise<[OrderEntity[], number]> {
    return await this.entityManager.transaction(
      this.isolationLevel.set(),
      async (em: EntityManager): Promise<[OrderEntity[], number]> => {
        return await this.ordersRepository.getOrdersByQuery(query, user, em);
      },
    );
  }

  public async getOrderById(order_id: number): Promise<OrderEntity> {
    return await this.entityManager.transaction(
      this.isolationLevel.set(),
      async (em: EntityManager): Promise<OrderEntity> => {
        const ordersRepositoryEM = em.getRepository(OrderEntity);
        return await ordersRepositoryEM.findOne({
          where: { id: order_id },
          relations: ['user', 'group', 'comments'],
        });
      },
    );
  }

  public async editOrderById(
    user: UserEntity,
    order: OrderEntity,
    dto: OrderReqDto,
  ): Promise<OrderEntity> {
    return await this.entityManager.transaction(
      this.isolationLevel.set(),
      async (em: EntityManager): Promise<OrderEntity> => {
        const ordersRepositoryEM = em.getRepository(OrderEntity);
        const groupsRepositoryEM = em.getRepository(GroupEntity);
        const { group, ...updateData } = dto;
        if (!updateData.status) {
          updateData.status = StatusEnum.IN_WORK;
        }
        const groupEntity = group
          ? await groupsRepositoryEM.findOneBy({ name: group })
          : undefined;
        const orderMerged = ordersRepositoryEM.merge(order, {
          ...updateData,
          group: groupEntity,
          user,
        });
        await ordersRepositoryEM.save(orderMerged);
        return await ordersRepositoryEM.findOne({
          where: { id: order.id },
          relations: ['user', 'group', 'comments'],
        });
      },
    );
  }

  public async getGroupingItems(): Promise<Record<string, string[]>> {
    const groupingItems = await this.ordersRepository.find({
      select: ['course', 'course_format', 'course_type'],
    });
    const keys = Object.keys(groupingItems[0]);
    const initial = {};
    keys.forEach((key) => {
      initial[key] = [];
    });
    groupingItems.reduce((acc, item) => {
      keys.forEach((key) => {
        acc[key] = Array.from(
          new Set(item[key] ? [...acc[key], item[key]] : acc[key]),
        );
      });
      return acc;
    }, initial);

    return initial;
  }

  public async getOrdersStatusStatistic(): Promise<OrderStatusStatisticResDto> {
    return await this.entityManager.transaction(
      this.isolationLevel.set(),
      async (em: EntityManager): Promise<OrderStatusStatisticResDto> => {
        return await this.ordersRepository.getOrdersStatusStatistic(em);
      },
    );
  }
}
