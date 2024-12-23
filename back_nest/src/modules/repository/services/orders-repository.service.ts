import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { OrderEntity } from '../../../database/entities/order.entity';
import { OrdersQueryReqDto } from '../../order/dto/req/orders-query.req.dto';

@Injectable()
export class OrdersRepository extends Repository<OrderEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderEntity, dataSource.manager);
  }

  public async getOrdersByQuery(
    { page, sortBy, sort }: OrdersQueryReqDto,
    em?: EntityManager,
  ): Promise<[OrderEntity[], number]> {
    const repository = em ? em.getRepository(OrderEntity) : this;
    let sortByMod: string;
    switch (sortBy) {
      case 'manager':
        sortByMod = 'user.surname';
        break;
      case 'group':
        sortByMod = 'group.name';
        break;
      default:
        sortByMod = `orders.${sortBy}`;
    }
    try {
      const [orderIds, total] = await repository
        .createQueryBuilder('orders')
        .select('orders.id')
        .leftJoinAndSelect('orders.user', 'user')
        .leftJoinAndSelect('orders.group', 'group')
        .orderBy(sortByMod, sort)
        .limit(25)
        .offset((page - 1) * 25)
        .getManyAndCount();
      const currentPage = await repository
        .createQueryBuilder('orders')
        .leftJoinAndSelect('orders.user', 'user')
        .leftJoinAndSelect('orders.group', 'group')
        .leftJoinAndSelect('orders.comments', 'comments')
        .where('orders.id IN (:...orderIds)', {
          orderIds: orderIds.map((order) => order.id),
        })
        .orderBy(sortByMod, sort)
        .getMany();

      return [currentPage, total];
    } catch (err) {
      throw new Error(err);
    }
  }
}
