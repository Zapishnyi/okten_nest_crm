import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { OrderEntity } from '../../../database/entities/order.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { OrdersQueryReqDto } from '../../order/dto/req/orders-query.req.dto';
import { OrderStatusStatisticResDto } from '../../user/dto/res/order-status-statistic.res.dto';

@Injectable()
export class OrdersRepository extends Repository<OrderEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderEntity, dataSource.manager);
  }

  public async getOrdersByQuery(
    {
      page,
      sortBy,
      sort,
      course,
      course_format,
      course_type,
      email,
      group,
      name,
      age,
      surname,
      status,
      phone,
      my_orders,
      upper_date,
      lower_date,
    }: OrdersQueryReqDto,
    user: UserEntity,
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
    // try {
    const ordersQuery = repository
      .createQueryBuilder('orders')
      .select('orders.id')
      .leftJoinAndSelect('orders.user', 'user')
      .leftJoinAndSelect('orders.group', 'group');

    if (name) {
      ordersQuery.andWhere('LOWER(orders.name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }
    if (surname) {
      ordersQuery.andWhere('LOWER(orders.surname) LIKE :surname', {
        surname: `%${surname.toLowerCase()}%`,
      });
    }
    if (email) {
      ordersQuery.andWhere('LOWER(orders.email) LIKE :email', {
        email: `%${email.toLowerCase()}%`,
      });
    }
    if (phone) {
      ordersQuery.andWhere('LOWER(orders.phone) LIKE :phone', {
        phone: `%${phone.toLowerCase()}%`,
      });
    }
    if (age) {
      ordersQuery.andWhere('orders.age = :age', { age });
    }
    if (course) {
      ordersQuery.andWhere('orders.course = :course', { course });
    }
    if (course_format) {
      ordersQuery.andWhere('orders.course_format = :course_format', {
        course_format,
      });
    }
    if (course_type) {
      ordersQuery.andWhere('orders.course_type = :course_type', {
        course_type,
      });
    }
    if (status) {
      ordersQuery.andWhere('orders.status = :status', {
        status,
      });
    }
    if (group) {
      ordersQuery.andWhere('group.name = :group', {
        group,
      });
    }
    if (my_orders) {
      ordersQuery.andWhere('orders.user.id = :user_id', {
        user_id: user.id,
      });
    }

    if (upper_date) {
      ordersQuery.andWhere('orders.created_at < :upper_date', {
        upper_date,
      });
    }
    if (lower_date) {
      ordersQuery.andWhere('orders.created_at > :lower_date', {
        lower_date,
      });
    }

    const ordersCounted = await ordersQuery
      .orderBy(sortByMod, sort)
      .limit(25)
      .offset((page - 1) * 25)
      .getManyAndCount();

    if (ordersCounted[0].length) {
      const currentPage = await repository
        .createQueryBuilder('orders')
        .leftJoinAndSelect('orders.user', 'user')
        .leftJoinAndSelect('orders.group', 'group')
        .leftJoinAndSelect('orders.comments', 'comments')
        .where('orders.id IN (:...orderIds)', {
          orderIds: ordersCounted[0].map((order) => order.id),
        })
        .orderBy(sortByMod, sort)
        .getMany();

      return [currentPage, ordersCounted[1]];
    } else {
      return [[], 0];
    }
    // } catch (err) {
    //   if (err instanceof QueryFailedError) {
    //     throw new Error(err.message);
    //   } else {
    //     throw new Error('HHHHHHHHHHH' + err);
    //   }
    // }
  }

  public async getOrdersStatusStatistic(
    em?: EntityManager,
  ): Promise<OrderStatusStatisticResDto> {
    const repository = em ? em.getRepository(OrderEntity) : this;
    try {
      return await repository
        .createQueryBuilder('orders')
        .select([
          'COUNT(*) AS Total', // This counts all orders
          `(SELECT COUNT(*) FROM orders WHERE status = 'In work') AS In_work`,
          `(SELECT COUNT(*) FROM orders WHERE status = 'New') AS New`,
          `(SELECT COUNT(*) FROM orders WHERE status = 'Agree') AS Agree`,
          `(SELECT COUNT(*) FROM orders WHERE status = 'Disagree') AS Disagree`,
          `(SELECT COUNT(*) FROM orders WHERE status = 'Dubbing') AS Dubbing`,
        ])
        .getRawOne();
    } catch (err) {
      throw new Error(err);
    }
  }
}
