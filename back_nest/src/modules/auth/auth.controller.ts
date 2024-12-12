import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './services/auth.service';

import { GetStoredUserDataFromResponse } from '../../common/custom_decorators/get-stored-user-data-from-response.decorator';
import { AuthResDto } from './dto/res/auth.res.dto';
import { UserPresenterService } from '../user/services/user-presenter.service';
import { JwtActivateGuard } from '../../common/guards/jwt-activate.guard';
import { IUserData } from './interfaces/IUserData';
import { UserValidateReqDto } from '../user/dto/req/user-validate.req.dto';
import { UserSignInReqDto } from '../user/dto/req/user-sign-in.req.dto';
import { UserResDto } from '../user/dto/res/user.res.dto';
import { JwtRefreshGuard } from '../../common/guards/jwt-refresh.guard';
import { JwtAccessGuard } from '../../common/guards/jwt-access.guard';

@ApiTags('1.Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userPresenter: UserPresenterService,
  ) {}

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:41:52.824Z',
      path: '/auth/sign-in',
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    example: {
      statusCode: 400,
      messages: [
        'email must be longer than or equal to 3 characters',
        'Must be a valid e-mail address',
        'email must be a string',
        'Password may contain any characters, no space, and it must be 5-16 characters long.',
        'password must be longer than or equal to 5 characters',
        'password must be a string',
      ],
      timestamp: '2024-12-12T19:43:34.861Z',
      path: '/auth/sign-in',
    },
  })
  @Post('sign-in')
  public async signIn(
    @Body() dto: UserSignInReqDto,
    @Req() request: Request,
  ): Promise<AuthResDto> {
    const [user, tokens] = await this.authService.signIn(dto, request);
    return { tokens, user: this.userPresenter.toResponseDto(user) };
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'jwt expired',
      timestamp: '2024-12-03T18:52:08.622Z',
      path: '/auth/activate',
    },
  })
  @UseGuards(JwtActivateGuard)
  @ApiBearerAuth('Activate-Token')
  @Post('activate')
  public async activate(
    @Body() dto: UserValidateReqDto,
    @GetStoredUserDataFromResponse() userData: IUserData,
  ): Promise<UserResDto> {
    const user = await this.authService.activate(dto, userData);
    return this.userPresenter.toResponseDto(user);
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'jwt expired',
      timestamp: '2024-12-03T18:52:08.622Z',
      path: '/auth/refresh',
    },
  })
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth('Refresh-Token')
  @Post('refresh')
  public async refresh(
    @GetStoredUserDataFromResponse() userData: IUserData,
  ): Promise<AuthResDto> {
    const tokens = await this.authService.refresh(userData);
    return { tokens, user: userData.user };
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'jwt expired',
      timestamp: '2024-12-03T18:52:08.622Z',
      path: '/auth/sign-out',
    },
  })
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('Access-Token')
  @Post('sign-out')
  async signOut(
    @GetStoredUserDataFromResponse() userData: IUserData,
  ): Promise<void> {
    await this.authService.signOut(userData);
  }
}
