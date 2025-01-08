import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { UserEntity } from '../../../database/entities/user.entity';
import { UsersQueryReqDto } from '../../user/dto/req/users-query.req.dto';
import IUserRaw from '../../user/interfaces/IUserRaw';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async isEmailExist(email: string): Promise<boolean> {
    return await this.exists({
      where: { email },
    });
  }

  public async getUsersByQuery(
    { sortBy, sort }: UsersQueryReqDto,
    em?: EntityManager,
  ): Promise<IUserRaw[]> {
    const repository = em ? em.getRepository(UserEntity) : this;
    try {
      return await repository
        .createQueryBuilder('users')
        .leftJoin('users.orders', 'orders') // Join the orders table
        .select([
          'users.id AS id',
          'users.name AS name',
          'users.surname AS surname',
          'users.email AS email',
          'users.ban AS ban',
          'users.active AS active',
          'users.role AS role',
          'users.last_login AS last_login',
          'users.created_at AS created_at',
          'COUNT(orders.id) AS Total', // Total orders count
        ])
        .addSelect(
          `(SELECT COUNT(*) FROM orders WHERE orders.user = users.id AND orders.status = 'In work')`,
          'In_work',
        )
        .addSelect(
          `(SELECT COUNT(*) FROM orders WHERE orders.user = users.id AND orders.status = 'New')`,
          'New',
        )
        .addSelect(
          `(SELECT COUNT(*) FROM orders WHERE orders.user = users.id AND orders.status = 'Agree')`,
          'Agree',
        )
        .addSelect(
          `(SELECT COUNT(*) FROM orders WHERE orders.user = users.id AND orders.status = 'Disagree')`,
          'Disagree',
        )
        .addSelect(
          `(SELECT COUNT(*) FROM orders WHERE orders.user = users.id AND orders.status = 'Dubbing')`,
          'Dubbing',
        )
        .groupBy('users.id')
        .orderBy(`users.${sortBy}`, sort)
        .getRawMany();
    } catch (err) {
      throw new Error(err);
    }
  }
}
