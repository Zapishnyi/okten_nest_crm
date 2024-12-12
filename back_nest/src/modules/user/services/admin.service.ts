import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from '../../repository/services/users-repository.service';
import { UserCreateByAdminReqDto } from '../dto/req/user-create-by-admin.req.dto';
import { UserEntity } from '../../../database/entities/user.entity';
import { UserService } from './user.service';
import { ActivateTokensRepository } from '../../repository/services/activate-tokens-repository.service';
import { TokenService } from '../../auth/services/token.service';
import { EntityManager } from 'typeorm';
import { ActivateTokenEntity } from '../../../database/entities/activate-token.entity';
import { IsolationLevelService } from '../../transaction-isolation-level/isolation-level.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userService: UserService,
    private readonly activateTokenRepository: ActivateTokensRepository,
    private readonly tokenService: TokenService,
    private readonly entityManager: EntityManager,
    private readonly isolationLevel: IsolationLevelService,
  ) {}

  public async userCreate(dto: UserCreateByAdminReqDto): Promise<UserEntity> {
    await this.userService.isUserNotExistOrThrow(dto.email);
    return await this.usersRepository.save(this.usersRepository.create(dto));
  }

  public async userActivate(
    user_id: number,
  ): Promise<[ActivateTokenEntity, UserEntity]> {
    return await this.entityManager.transaction(
      await this.isolationLevel.set(),
      async (em) => {
        const usersRepositoryEM = em.getRepository(UserEntity);
        const activateTokenRepositoryEM = em.getRepository(ActivateTokenEntity);
        const user = await usersRepositoryEM.findOneBy({ id: user_id });
        if (!user)
          throw new NotFoundException(
            `User with ID: ${user_id} -  does not exist`,
          );
        if (user.active)
          throw new ConflictException(
            `User with ID: ${user_id} - already activated`,
          );
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

  public async userBan(user_id: number): Promise<UserEntity> {
    return await this.entityManager.transaction(
      await this.isolationLevel.set(),
      async (em) => {
        const usersRepositoryEM = em.getRepository(UserEntity);
        const user = await usersRepositoryEM.findOneBy({ id: user_id });
        if (!!user) {
          return await usersRepositoryEM.save(
            usersRepositoryEM.create({ ...user, ban: true }),
          );
        } else {
          throw new NotFoundException(
            `User with ID: ${user_id} -  does not exist`,
          );
        }
      },
    );
  }

  public async userReinstate(user_id: number): Promise<UserEntity> {
    return await this.entityManager.transaction(
      await this.isolationLevel.set(),
      async (em) => {
        const usersRepositoryEM = em.getRepository(UserEntity);
        const user = await usersRepositoryEM.findOneBy({ id: user_id });
        if (!!user) {
          return await usersRepositoryEM.save(
            usersRepositoryEM.create({ ...user, ban: false }),
          );
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
      await this.isolationLevel.set(),
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
