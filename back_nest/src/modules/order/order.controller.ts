import { Controller, Get, Query, UseGuards } from '@nestjs/common';
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

@ApiTags('3.Orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly ordersPresenter: OrderPresenterService,
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

  // @ApiBearerAuth('Access-Token')
  // @UseGuards(JwtAccessGuard)
  // @Get('/grouping_items')
  // public async getGroupingItems(): Promise<Record<string, string[]>> {
  //   return await this.orderService.getGroupingItems();
  // }
}
