import { Injectable } from '@nestjs/common';

import { OrdersRepository } from '../../repository/services/orders-repository.service';
import { OrdersQueryReqDto } from '../dto/req/orders-query.req.dto';

@Injectable()
export class OrderService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async getByQuery(query: OrdersQueryReqDto): Promise<any> {
    return await this.ordersRepository.getByQuery(query);
  }

  public async getGroupingItems(): Promise<Record<string, string[]>> {
    const groupingItems = await this.ordersRepository.find({
      select: ['course', 'course_format', 'course_type'],
    });
    const keys = Object.keys(groupingItems[0]);
    let initial = {};
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
}
