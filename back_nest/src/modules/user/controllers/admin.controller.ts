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
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AdminRoleGuard } from '../../../common/guards/admin-role.guard';
import { JwtAccessGuard } from '../../../common/guards/jwt-access.guard';
import { OrderService } from '../../order/services/order.service';
import { UserCreateByAdminReqDto } from '../dto/req/user-create-by-admin.req.dto';
import { UsersQueryReqDto } from '../dto/req/users-query.req.dto';
import { OrderStatusStatisticResDto } from '../dto/res/order-status-statistic.res.dto';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserActivateResDto } from '../dto/res/user-activate.res.dto';
import { UserBanResDto } from '../dto/res/user-ban.res.dto';
import { AdminService } from '../services/admin.service';
import { UserPresenterService } from '../services/user-presenter.service';

@ApiTags('2.Administrator')
@Controller('/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userPresenter: UserPresenterService,
    private readonly ordersService: OrderService,
  ) {}

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
  @ApiConflictResponse({
    description: 'Conflict',
    example: {
      statusCode: 409,
      messages: 'User with ID: 2 - already activated',
      timestamp: '2024-12-03T19:13:05.162Z',
      path: '/user/2/activate',
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
      user,
    };
  }

  //Get Orders Statistic -------------------------------------
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
      messages: [
        'surname must be longer than or equal to 3 characters',
        'surname must be a string',
        'surname should not be empty',
      ],
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
  @Post('user/create')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  public async userCreate(
    @Body() dto: UserCreateByAdminReqDto,
  ): Promise<UserResDto> {
    return this.userPresenter.toResponseDtoFromEntity(
      await this.adminService.userCreate(dto),
    );
  }

  // Ban---------------------------------------------------
  @ApiNotFoundResponse({
    description: 'Not Found',
    example: {
      statusCode: 404,
      messages: 'User with ID: 5 -  does not exist',
      timestamp: '2024-12-03T20:40:32.905Z',
      path: '/user/5/ban',
    },
  })
  @ApiBearerAuth('Access-Token')
  @Patch('user/:id/ban-reinstate')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  public async userBanReinstate(
    @Param('id', ParseIntPipe) user_id: number,
  ): Promise<UserBanResDto> {
    return this.userPresenter.toResponseDtoFromEntity(
      await this.adminService.userBanReinstate(user_id),
    );
  }

  //Delete--------------------------------------------------------
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
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:38:15.306Z',
      path: 'admin/group/:id',
    },
  })
  @ApiBearerAuth('Access-Token')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  @Delete('group/:id')
  public async deleteGroup(
    @Param('id', ParseIntPipe) group_id: number,
  ): Promise<void> {
    await this.adminService.deleteGroup(group_id);
  }
}
