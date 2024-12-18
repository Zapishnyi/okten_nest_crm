import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { OrderService } from './services/order.service';
import { OrdersQueryReqDto } from './dto/req/orders-query.req.dto';
import { OrdersListResDto } from './dto/res/orders-list.res.dto';
import { OrderPresenterService } from './services/order-presenter.service';
import { JwtAccessGuard } from '../../common/guards/jwt-access.guard';
import { OrderOwnershipGuard } from '../../common/guards/order-ownership.guard';
import { OrderEntity } from '../../database/entities/order.entity';
import { CommentReqDto } from '../comment/dto/req/comment.req.dto';
import { GetStoredOrderDataFromResponse } from '../../common/custom_decorators/get-stored-order-data-from-response.decorator';
import { GetStoredUserDataFromResponse } from '../../common/custom_decorators/get-stored-user-data-from-response.decorator';
import { IUserData } from '../auth/interfaces/IUserData';
import { CommentService } from '../comment/services/comment.service';

@ApiTags('3.Orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly ordersPresenter: OrderPresenterService,
    private readonly commentService: CommentService,
  ) {}

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:38:15.306Z',
      path: '/orders?page=1&order=DESC&orderBy=id',
    },
  })
  @ApiBearerAuth('Access-Token')
  @UseGuards(JwtAccessGuard)
  @Get()
  public async getByQuery(
    @Query() query: OrdersQueryReqDto,
  ): Promise<OrdersListResDto> {
    const [ordersArray, total] = await this.orderService.getByQuery(query);
    return this.ordersPresenter.toOrderListDto(ordersArray, query, total);
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:38:15.306Z',
      path: '/orders?page=1&order=DESC&orderBy=id',
    },
  })
  @ApiBearerAuth('Access-Token')
  @UseGuards(JwtAccessGuard, OrderOwnershipGuard)
  @Post('/:id/comment')
  public async addComment(
    @GetStoredOrderDataFromResponse() order: OrderEntity,
    @GetStoredUserDataFromResponse() { user }: IUserData,
    @Body() dto: CommentReqDto,
    @Param('id', ParseIntPipe) order_id: number,
  ): Promise<any> {
    return this.commentService.addComment(dto, user, order);
  }

  // @ApiBearerAuth('Access-Token')
  // @UseGuards(JwtAccessGuard)
  // @Get('/grouping_items')
  // public async getGroupingItems(): Promise<Record<string, string[]>> {
  //   return await this.orderService.getGroupingItems();
  // }
}
