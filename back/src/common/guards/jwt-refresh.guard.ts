import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { TokenTypeEnum } from '../../modules/auth/enums/token-type.enum';
import { TokenService } from '../../modules/auth/services/token.service';
import { AuthTokensRepository } from '../../modules/repository/services/auth-tokens-repository.service';
import { UsersRepository } from '../../modules/repository/services/users-repository.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly authTokensRepository: AuthTokensRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async canActivate(
    context: ExecutionContext /* give access to current request data*/,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refresh = request.get('Authorization')?.split(' ').pop();

    if (!refresh) {
      throw new UnauthorizedException();
    }

    const { user_id, device } = await this.tokenService.verifyToken(
      refresh,
      TokenTypeEnum.REFRESH,
    );
    if (!user_id) {
      throw new UnauthorizedException();
    }

    const refreshTokenExist =
      await this.authTokensRepository.isAuthTokenExist(refresh);
    if (!refreshTokenExist) {
      throw new UnauthorizedException();
    }

    const user = await this.usersRepository.findOneBy({
      id: user_id,
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
