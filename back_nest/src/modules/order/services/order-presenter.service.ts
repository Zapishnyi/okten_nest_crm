import { Injectable } from '@nestjs/common';

import { OrderEntity } from '../../../database/entities/order.entity';
import { OrdersQueryReqDto } from '../dto/req/orders-query.req.dto';
import { OrdersListResDto } from '../dto/res/orders-list.res.dto';
import { OrderResDto } from '../dto/res/order.res.dto';

@Injectable()
export class OrderPresenterService {
  public toOrderListDto(
    orderList: OrderEntity[],
    { page, sortBy, sort }: OrdersQueryReqDto,
    total: number,
  ): OrdersListResDto {
    return {
      data: orderList.map((order) => this.toOrderResDto(order)),
      total,
      limit: 25,
      page,
      pages: Math.ceil(total / 25),
      sortBy,
      sort,
    };
  }

  public toOrderResDto(order: OrderEntity): OrderResDto {
    return {
      id: order.id,
      name: order.name,
      surname: order.surname,
      email: order.email,
      phone: order.phone,
      age: order.age,
      course: order.course,
      course_format: order.course_format,
      course_type: order.course_type,
      sum: order.sum,
      alreadyPaid: order.alreadyPaid,
      utm: order.utm,
      msg: order.msg,
      status: order.status,
      created_at: order.created_at,
    };
  }
}
