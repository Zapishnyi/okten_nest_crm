import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// eslint-disable-next-line max-len
import { GetStoredOrderDataFromResponse } from '../../common/custom_decorators/get-stored-order-data-from-response.decorator';
// eslint-disable-next-line max-len
import { GetStoredUserDataFromResponse } from '../../common/custom_decorators/get-stored-user-data-from-response.decorator';
import { JwtAccessGuard } from '../../common/guards/jwt-access.guard';
import { OrderOwnershipGuard } from '../../common/guards/order-ownership.guard';
import { OrderEntity } from '../../database/entities/order.entity';
import { IUserData } from '../auth/interfaces/IUserData';
import { CommentReqDto } from '../comment/dto/req/comment.req.dto';
import { CommentService } from '../comment/services/comment.service';
import { OrdersQueryReqDto } from './dto/req/orders-query.req.dto';
import { OrderResDto } from './dto/res/order.res.dto';
import { OrdersListResDto } from './dto/res/orders-list.res.dto';
import { OrderService } from './services/order.service';
import { OrderPresenterService } from './services/order-presenter.service';

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
  public async getOrdersByQuery(
    @Query() query: OrdersQueryReqDto,
  ): Promise<OrdersListResDto> {
    const [ordersArray, total] =
      await this.orderService.getOrdersByQuery(query);
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
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async getOrderById(
    @Param('id', ParseIntPipe) order_id: number,
  ): Promise<OrderResDto> {
    return this.ordersPresenter.toOrderResDto(
      await this.orderService.getOrderById(order_id),
    );
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
  @UseGuards(JwtAccessGuard)
  @Put('/:id')
  public async editOrderById(
    @Param('id', ParseIntPipe) order_id: number,
    @Body() dto: any,
  ): Promise<OrderResDto> {
    return this.ordersPresenter.toOrderResDto(
      await this.orderService.getOrderById(order_id),
    );
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
  ): Promise<OrderResDto> {
    return this.ordersPresenter.toOrderResDto(
      await this.commentService.addComment(dto, user, order),
    );
  }

  // @ApiBearerAuth('Access-Token')
  // @UseGuards(JwtAccessGuard)
  // @Get('/grouping_items')
  // public async getGroupingItems(): Promise<Record<string, string[]>> {
  //   return await this.orderService.getGroupingItems();
  // }
}
