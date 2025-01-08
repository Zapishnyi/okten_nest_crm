import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { OrderEntity } from '../../../database/entities/order.entity';
import { OrdersRepository } from '../../repository/services/orders-repository.service';
import { IsolationLevelService } from '../../transaction-isolation-level/isolation-level.service';
import { OrderStatusStatisticResDto } from '../../user/dto/res/order-status-statistic.res.dto';
import { OrdersQueryReqDto } from '../dto/req/orders-query.req.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly entityManager: EntityManager,
    private readonly isolationLevel: IsolationLevelService,
  ) {}

  public async getOrdersByQuery(
    query: OrdersQueryReqDto,
  ): Promise<[OrderEntity[], number]> {
    return await this.entityManager.transaction(
      this.isolationLevel.set(),
      async (em: EntityManager): Promise<[OrderEntity[], number]> => {
        return await this.ordersRepository.getOrdersByQuery(query, em);
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
