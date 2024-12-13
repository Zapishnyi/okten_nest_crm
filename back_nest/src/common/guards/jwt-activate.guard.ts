import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenTypeEnum } from '../../modules/auth/enums/token-type.enum';
import { TokenService } from '../../modules/auth/services/token.service';
import { UsersRepository } from '../../modules/repository/services/users-repository.service';
import { ActivateTokensRepository } from '../../modules/repository/services/activate-tokens-repository.service';
import { IsolationLevelService } from '../../modules/transaction-isolation-level/isolation-level.service';
import { EntityManager } from 'typeorm';
import { UserEntity } from '../../database/entities/user.entity';

@Injectable()
export class JwtActivateGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly activateTokensRepository: ActivateTokensRepository,
    private readonly usersRepository: UsersRepository,
    private readonly isolationLevel: IsolationLevelService,
    private readonly entityManager: EntityManager,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const activate = request.get('Authorization')?.split(' ').pop();

    if (!activate) {
      throw new UnauthorizedException();
    }

    const { user_id, device } = await this.tokenService.verifyToken(
      activate,
      TokenTypeEnum.ACTIVATE,
    );
    if (!user_id) {
      throw new UnauthorizedException();
    }
    await this.entityManager.transaction(
      this.isolationLevel.set(),
      async (em: EntityManager) => {
        const userRepositoryEM = em.getRepository(UserEntity);
        const accessTokenExist =
          await this.activateTokensRepository.isActivateTokenExist(
            activate,
            em,
          );
        if (!accessTokenExist) {
          throw new UnauthorizedException();
        }

        const user = await userRepositoryEM.findOne({
          where: {
            id: user_id,
          },
        });
        if (!user) {
          throw new UnauthorizedException();
        }
        request.user_data = {
          user,
          device,
        };
      },
    );

    return true;
  }
}
