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
        .leftJoinAndSelect('users.orders', 'orders')
        .groupBy('users.id')
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
          'COUNT(orders.id) AS total_orders',
        ])
        .orderBy(sortBy, sort)
        .getRawMany();
    } catch (err) {
      throw new Error(err);
    }
  }
}
