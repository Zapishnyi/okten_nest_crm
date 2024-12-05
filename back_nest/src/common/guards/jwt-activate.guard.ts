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

@Injectable()
export class JwtActivateGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly activateTokensRepository: ActivateTokensRepository,
    private readonly usersRepository: UsersRepository,
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

    const accessTokenExist =
      await this.activateTokensRepository.isActivateTokenExist(activate);
    if (!accessTokenExist) {
      throw new UnauthorizedException();
    }

    const user = await this.usersRepository.findOne({
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
    return true;
  }
}
