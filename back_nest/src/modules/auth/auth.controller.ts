import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// eslint-disable-next-line max-len
import { GetStoredUserDataFromResponse } from '../../common/custom_decorators/get-stored-user-data-from-response.decorator';
import { JwtAccessGuard } from '../../common/guards/jwt-access.guard';
import { JwtActivateGuard } from '../../common/guards/jwt-activate.guard';
import { JwtRefreshGuard } from '../../common/guards/jwt-refresh.guard';
import { UserResDto } from '../user/dto/res/user.res.dto';
import { UserPresenterService } from '../user/services/user-presenter.service';
import { ActivateReqDto } from './dto/req/activate.req.dto';
import { UserAuthReqDto } from './dto/req/user-auth.req.dto';
import { AuthResDto } from './dto/res/auth.res.dto';
import { IUserData } from './interfaces/IUserData';
import { AuthService } from './services/auth.service';

@ApiTags('1.Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userPresenter: UserPresenterService,
  ) {}

  // Sign in ---------------------------------------------------
  @ApiOperation({
    summary: 'User login using email and password',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:41:52.824Z',
      path: '/auth/sign-in',
    },
  })
  @Post('sign-in')
  public async signIn(
    @Body() dto: UserAuthReqDto,
    @Req() request: Request,
  ): Promise<AuthResDto> {
    const [user, tokens] = await this.authService.signIn(dto, request);
    return { tokens, user: this.userPresenter.toResponseDtoFromEntity(user) };
  }

  // Activate user ---------------------------------------------
  @ApiOperation({
    summary: 'User activation using an activation token.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:52:08.622Z',
      path: '/auth/activate',
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    example: {
      statusCode: 400,
      messages: ['Password must contain  ...'],
      timestamp: '2025-01-29T14:25:09.535Z',
      path: '/auth/activate',
    },
  })
  @UseGuards(JwtActivateGuard)
  @ApiBearerAuth('Activate-Token')
  @Post('activate')
  public async activate(
    @Body() dto: ActivateReqDto,
    @GetStoredUserDataFromResponse() userData: IUserData,
  ): Promise<UserResDto> {
    const user = await this.authService.activate(dto, userData);
    return this.userPresenter.toResponseDtoFromEntity(user);
  }

  // Refresh tokens --------------------------------------------
  @ApiOperation({
    summary: 'Refresh of tokens pair.',
  })
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
    return {
      tokens,
      user: this.userPresenter.toResponseDtoFromEntity(userData.user),
    };
  }

  // Log out -----------------------------------------------------
  @ApiOperation({
    summary: 'User log out.',
  })
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
  // Get logged user data -----------------------------------------------------
  @ApiOperation({
    summary: 'Retrieve logged-in user data.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'jwt expired',
      timestamp: '2024-12-03T18:52:08.622Z',
      path: '/auth/me',
    },
  })
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('Access-Token')
  @Get('me')
  public async me(
    @GetStoredUserDataFromResponse() { user }: IUserData,
  ): Promise<UserResDto> {
    return this.userPresenter.toResponseDtoFromEntity(user);
  }
}
