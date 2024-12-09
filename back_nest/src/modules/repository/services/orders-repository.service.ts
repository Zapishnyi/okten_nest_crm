import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { OrderEntity } from '../../../database/entities/order.entity';
import { OrdersQueryReqDto } from '../../order/dto/req/orders-query.req.dto';

@Injectable()
export class OrdersRepository extends Repository<OrderEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderEntity, dataSource.manager);
  }

  public async getByQuery({
    page,
    sortBy,
    sort,
  }: OrdersQueryReqDto): Promise<[OrderEntity[], number]> {
    try {
      return this.createQueryBuilder('orders')
        .limit(25)
        .offset((page - 1) * 25)
        .orderBy(`orders.${sortBy}`, sort)
        .getManyAndCount();
    } catch (err) {
      throw new Error(err);
    }
  }
}
