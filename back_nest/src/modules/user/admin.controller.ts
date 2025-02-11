import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// eslint-disable-next-line max-len
import { GetStoredUserDataFromResponse } from '../../common/custom_decorators/get-stored-user-data-from-response.decorator';
import { AdminRoleGuard } from '../../common/guards/admin-role.guard';
import { JwtAccessGuard } from '../../common/guards/jwt-access.guard';
import { IUserData } from '../auth/interfaces/IUserData';
import { OrderService } from '../order/services/order.service';
import { UserResDto } from '../user/dto/res/user.res.dto';
import { UserPresenterService } from '../user/services/user-presenter.service';
import { UserCreateByAdminReqDto } from './dto/req/user-create-by-admin.req.dto';
import { UsersQueryReqDto } from './dto/req/users-query.req.dto';
import { OrderStatusStatisticResDto } from './dto/res/order-status-statistic.res.dto';
import { UserActivateResDto } from './dto/res/user-activate.res.dto';
import { UserBanResDto } from './dto/res/user-ban.res.dto';
import { AdminService } from './services/admin.service';

@ApiTags('2.Administrator')
@Controller('/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userPresenter: UserPresenterService,
    private readonly ordersService: OrderService,
  ) {}

  // Get all users data --------------------------------------------
  @ApiOperation({
    summary: "Retrieve all users' data based on sorting parameters.",
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:55:06.367Z',
      path: '/user/get-all',
    },
  })
  @ApiBearerAuth('Access-Token')
  @Get('user/get-all')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  public async getAllUsers(
    @Query() query: UsersQueryReqDto,
  ): Promise<UserResDto[]> {
    const users = await this.adminService.getAllUsers(query);
    return users.map((e) => this.userPresenter.toResponseDtoFromRaw(e));
  }

  //Activate--------------------------------------------
  @ApiOperation({
    summary: "Retrieve a user's activation token by user ID.",
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:55:06.367Z',
      path: '/user/2/activate',
    },
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    example: {
      statusCode: 404,
      messages: 'User with ID: 5 -  does not exist',
      timestamp: '2024-12-03T20:40:32.905Z',
      path: '/user/5/activate',
    },
  })
  @ApiBearerAuth('Access-Token')
  @Get('user/:id/activate')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  public async userActivate(
    @Param('id', ParseIntPipe) user_id: number,
  ): Promise<UserActivateResDto> {
    const [{ activate }, user] = await this.adminService.userActivate(user_id);
    return {
      activateToken: activate,
      user: this.userPresenter.toUserNoStatisticResponseDtoFromEntity(user),
    };
  }

  //Get Orders Statistic -------------------------------------
  @ApiOperation({
    summary: 'Retrieve statistics for all order statuses.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:38:15.306Z',
      path: 'orders/statistic',
    },
  })
  @ApiBearerAuth('Access-Token')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  @Get('orders/statistic')
  public async getOrdersStatusStatistic(): Promise<OrderStatusStatisticResDto> {
    return await this.ordersService.getOrdersStatusStatistic();
  }

  // Add Manager -------------------------------------------------
  @ApiOperation({
    summary: 'Create a new manager.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:55:06.367Z',
      path: '/user/create',
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    example: {
      statusCode: 400,
      messages: ['surname must be a string', 'surname should not be empty'],
      timestamp: '2024-12-03T18:58:59.338Z',
      path: '/user/create',
    },
  })
  @ApiConflictResponse({
    description: 'Conflict',
    example: {
      statusCode: 409,
      messages: 'User is already exists',
      timestamp: '2024-12-03T19:00:32.047Z',
      path: '/user/create',
    },
  })
  @ApiBearerAuth('Access-Token')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  @Post('user/create')
  public async userCreate(
    @Body() dto: UserCreateByAdminReqDto,
  ): Promise<UserResDto> {
    return this.userPresenter.toResponseDtoFromEntity(
      await this.adminService.userCreate(dto),
    );
  }

  // Ban---------------------------------------------------
  @ApiOperation({
    summary: 'Ban or reinstate a user by user ID.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:55:06.367Z',
      path: '/user/5/ban',
    },
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    example: {
      statusCode: 404,
      messages: 'User with ID: 5 -  does not exist',
      timestamp: '2024-12-03T20:40:32.905Z',
      path: '/user/5/ban',
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    example: {
      statusCode: 403,
      messages: "User can't ban himself",
      timestamp: '2024-12-03T20:40:32.905Z',
      path: '/user/5/ban',
    },
  })
  @ApiBearerAuth('Access-Token')
  @Patch('user/:id/ban-reinstate')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  public async userBanReinstate(
    @Param('id', ParseIntPipe) user_id: number,
    @GetStoredUserDataFromResponse() { user }: IUserData,
  ): Promise<UserBanResDto> {
    return this.userPresenter.toResponseDtoFromEntity(
      await this.adminService.userBanReinstate(user_id, user),
    );
  }

  //Delete User--------------------------------------------------------
  @ApiOperation({
    summary: 'Delete a user by user ID.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:55:06.367Z',
      path: '/user/5',
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    example: {
      statusCode: 403,
      messages: "User can't ban himself",
      timestamp: '2024-12-03T20:40:32.905Z',
      path: '/user/5',
    },
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    example: {
      statusCode: 404,
      messages: 'User with ID: 5 -  does not exist',
      timestamp: '2024-12-03T20:40:32.905Z',
      path: '/user/5',
    },
  })
  @ApiBearerAuth('Access-Token')
  @Delete('user/:id')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  public async userDelete(
    @Param('id', ParseIntPipe) user_id: number,
  ): Promise<void> {
    await this.adminService.userDelete(user_id);
  }

  // Delete Group --------------------------------------------
  @ApiOperation({
    summary: 'Delete a group name by group ID.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:38:15.306Z',
      path: 'admin/group/:id',
    },
  })
  @ApiConflictResponse({
    description: 'Conflict',
    example: {
      statusCode: 409,
      messages: 'Such a group does not exist',
      timestamp: '2024-12-03T19:00:32.047Z',
      path: '/admin/group/:id',
    },
  })
  @ApiBearerAuth('Access-Token')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  @Delete('group/:id')
  public async groupDelete(
    @Param('id', ParseIntPipe) group_id: number,
  ): Promise<void> {
    await this.adminService.groupDelete(group_id);
  }
}
