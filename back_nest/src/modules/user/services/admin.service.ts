import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { ActivateTokenEntity } from '../../../database/entities/activate-token.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { TokenService } from '../../auth/services/token.service';
import { UsersRepository } from '../../repository/services/users-repository.service';
import { IsolationLevelService } from '../../transaction-isolation-level/isolation-level.service';
import { UserCreateByAdminReqDto } from '../dto/req/user-create-by-admin.req.dto';
import { UsersQueryReqDto } from '../dto/req/users-query.req.dto';
import IUserRaw from '../interfaces/IUserRaw';
import { UserService } from './user.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly entityManager: EntityManager,
    private readonly isolationLevel: IsolationLevelService,
  ) {}

  public async getAllUsers(query: UsersQueryReqDto): Promise<IUserRaw[]> {
    return await this.entityManager.transaction(
      this.isolationLevel.set(),
      async (em: EntityManager): Promise<IUserRaw[]> => {
        return await this.usersRepository.getUsersByQuery(query, em);
      },
    );
  }

  public async userCreate(dto: UserCreateByAdminReqDto): Promise<UserEntity> {
    await this.userService.isUserNotExistOrThrow(dto.email);
    return await this.entityManager.transaction(
      this.isolationLevel.set(),
      (em: EntityManager): Promise<UserEntity> => {
        const userRepositoryEM = em.getRepository(UserEntity);
        return userRepositoryEM.save(userRepositoryEM.create(dto));
      },
    );
  }

  public async userActivate(
    user_id: number,
  ): Promise<[ActivateTokenEntity, UserEntity]> {
    return await this.entityManager.transaction(
      this.isolationLevel.set(),
      async (em) => {
        const usersRepositoryEM = em.getRepository(UserEntity);
        const activateTokenRepositoryEM = em.getRepository(ActivateTokenEntity);
        const user = await usersRepositoryEM.findOneBy({ id: user_id });
        if (!user)
          throw new NotFoundException(
            `User with ID: ${user_id} -  does not exist`,
          );
        // if (user.active)
        //   throw new ConflictException(
        //     `User with ID: ${user_id} - already activated`,
        //   );
        const activateToken = await this.tokenService.generateActivateToken({
          user_id,
          device: 'activate',
        });
        await activateTokenRepositoryEM.delete({ user_id });
        const activate = await activateTokenRepositoryEM.save(
          activateTokenRepositoryEM.create({ ...activateToken, user_id }),
        );
        return [activate, user];
      },
    );
  }

  public async userBanReinstate(user_id: number): Promise<UserEntity> {
    return await this.entityManager.transaction(
      this.isolationLevel.set(),
      async (em) => {
        const usersRepositoryEM = em.getRepository(UserEntity);
        const user = await usersRepositoryEM.findOneBy({ id: user_id });
        if (!!user) {
          await usersRepositoryEM.save(
            usersRepositoryEM.create({ ...user, ban: !user.ban }),
          );
          return await usersRepositoryEM.findOne({
            where: { id: user_id },
            relations: ['orders'],
          });
        } else {
          throw new NotFoundException(
            `User with ID: ${user_id} -  does not exist`,
          );
        }
      },
    );
  }

  public async userDelete(user_id: number): Promise<void> {
    await this.entityManager.transaction(
      this.isolationLevel.set(),
      async (em) => {
        const usersRepositoryEM = em.getRepository(UserEntity);
        if (await usersRepositoryEM.exists({ where: { id: user_id } })) {
          await usersRepositoryEM.delete({ id: user_id });
        } else {
          throw new NotFoundException(
            `User with ID: ${user_id} -  does not exist`,
          );
        }
      },
    );
  }
}
