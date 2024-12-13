import {
  Injectable,
  Logger,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AdminConfigType, EnvConfigType } from '../../../configs/envConfigType';

import { TokenService } from './token.service';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../interfaces/IUserData';
import { UserValidateReqDto } from '../../user/dto/req/user-validate.req.dto';
import { UserSignInReqDto } from '../../user/dto/req/user-sign-in.req.dto';
import { EntityManager } from 'typeorm';
import { AuthTokenEntity } from '../../../database/entities/auth-token.entity';
import { ActivateTokenEntity } from '../../../database/entities/activate-token.entity';
import { IsolationLevelService } from '../../transaction-isolation-level/isolation-level.service';
import { AuthTokenPairResDto } from '../dto/res/auth-tokens-pair.res.dto';
import { AdminSelfCreateReqDto } from '../../user/dto/req/admin-self-create.req.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly entityManager: EntityManager,
    private readonly envConfig: ConfigService<EnvConfigType>,
    private readonly isolation: IsolationLevelService,
  ) {}

  private async generateSaveAuthTokens(
    user_id: number,
    device: string,
    em: EntityManager,
  ): Promise<AuthTokenPairResDto> {
    const authTokensRepositoryEM = em.getRepository(AuthTokenEntity);
    const tokens = await this.tokenService.generateAuthTokens({
      user_id,
      device,
    });

    await authTokensRepositoryEM.save(
      authTokensRepositoryEM.create({
        device,
        access: tokens.access,
        refresh: tokens.refresh,
        user_id,
      }),
    );

    return tokens;
  }

  private async deleteAuthTokens(
    user_id: number,
    device: string,
    em: EntityManager,
  ) {
    const authTokensRepositoryEM = em.getRepository(AuthTokenEntity);
    // delete previously issued refresh and access tokens
    await authTokensRepositoryEM.delete({
      device,
      user_id,
    });
  }

  public async signIn(
    dto: UserSignInReqDto,
    request: Request,
  ): Promise<[UserEntity, AuthTokenPairResDto]> {
    const device = request.headers['user-agent'];
    return await this.entityManager.transaction(
      await this.isolation.set(),
      async (em: EntityManager): Promise<[UserEntity, AuthTokenPairResDto]> => {
        const usersRepositoryEM = em.getRepository(UserEntity);
        const user = await usersRepositoryEM.findOne({
          where: { email: dto.email },
          select: [
            'id',
            'name',
            'surname',
            'email',
            'password',
            'active',
            'role',
            'created_at',
            'ban',
          ],
        });
        // Is user exist?
        if (!user) {
          throw new UnauthorizedException();
        }
        // Is password valid?
        const isPasswordValid = await bcrypt.compare(
          dto.password,
          user.password,
        );
        if (!isPasswordValid) {
          throw new UnauthorizedException();
        }
        // delete previously issued refresh and access Tokens
        await this.deleteAuthTokens(user.id, device, em);
        const tokens = await this.generateSaveAuthTokens(user.id, device, em);
        return [user, tokens];
      },
    );
  }

  public async refresh({
    user,
    device,
  }: IUserData): Promise<AuthTokenPairResDto> {
    return await this.entityManager.transaction(
      await this.isolation.set(),
      async (em: EntityManager) => {
        await this.deleteAuthTokens(user.id, device, em);
        return await this.generateSaveAuthTokens(user.id, device, em);
      },
    );
  }

  public async signOut({ user, device }: IUserData): Promise<void> {
    await this.entityManager.transaction(
      await this.isolation.set(),
      async (em: EntityManager): Promise<void> => {
        const activateTokensRepositoryEM =
          em.getRepository(ActivateTokenEntity);
        await this.deleteAuthTokens(user.id, device, em);
        await activateTokensRepositoryEM.delete({ user_id: user.id });
      },
    );
  }

  public async activate(
    dto: UserValidateReqDto,
    { user }: IUserData,
  ): Promise<UserEntity> {
    return await this.entityManager.transaction(
      await this.isolation.set(),
      async (em: EntityManager): Promise<UserEntity> => {
        const userRepositoryEM = em.getRepository(UserEntity);
        const activateTokensRepositoryEM =
          em.getRepository(ActivateTokenEntity);
        const password = await bcrypt.hash(dto.password, 10);
        await userRepositoryEM.update(user.id, {
          password,
          active: true,
        });
        await activateTokensRepositoryEM.delete({ user_id: user.id });
        return { ...user, active: true };
      },
    );
  }

  public async adminCreate(): Promise<void> {
    const admin = plainToInstance(
      AdminSelfCreateReqDto,
      this.envConfig.get<AdminConfigType>('admin'),
    );
    const errors = await validate(admin);
    if (errors.length > 0) {
      throw new NotAcceptableException([
        'Administrator data is not valid as mentioned below:',
        ...errors.map((error) => Object.values(error.constraints)).flat(),
      ]);
    }
    await this.entityManager.transaction(
      await this.isolation.set(),
      async (em: EntityManager): Promise<void> => {
        const usersRepositoryEM = em.getRepository(UserEntity);
        try {
          if (
            !(await usersRepositoryEM.findOneBy({
              email: admin.email,
            }))
          ) {
            // Admin account create
            await usersRepositoryEM.save(
              usersRepositoryEM.create({
                ...admin,
                password: await bcrypt.hash(admin.password, 10),
              }),
            );
            Logger.log('Administrator account created');
          } else {
            Logger.log('Administrator account exist');
          }
        } catch (err) {
          Logger.error(
            `Administrator account creation failed with error:${err}`,
          );
        }
      },
    );
  }
}
