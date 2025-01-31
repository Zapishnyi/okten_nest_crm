import {
  Body,
  Controller,
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
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// eslint-disable-next-line max-len
import { GetStoredOrderDataFromResponse } from '../../common/custom_decorators/get-stored-order-data-from-response.decorator';
// eslint-disable-next-line max-len
import { GetStoredUserDataFromResponse } from '../../common/custom_decorators/get-stored-user-data-from-response.decorator';
import { JwtAccessGuard } from '../../common/guards/jwt-access.guard';
import { OrderOwnershipGuard } from '../../common/guards/order-ownership.guard';
import { IUserData } from '../auth/interfaces/IUserData';
import { CommentReqDto } from '../comment/dto/req/comment.req.dto';
import { CommentService } from '../comment/services/comment.service';
import { OrderReqDto } from './dto/req/order.req.dto';
import { OrdersQueryReqDto } from './dto/req/orders-query.req.dto';
import { OrderResDto } from './dto/res/order.res.dto';
import { OrdersListResDto } from './dto/res/orders-list.res.dto';
import IOrderData from './Interfaces/IOrderData';
import { OrderService } from './services/order.service';
import { OrderPresenterService } from './services/order-presenter.service';

@ApiTags('3.Orders')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly ordersPresenter: OrderPresenterService,
    private readonly commentService: CommentService,
  ) {}

  // get orders by query -------------------------------------------
  @ApiOperation({
    summary: 'Retrieve paginated orders based on query parameters',
  })
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
  @Get('/all')
  public async getOrdersByQuery(
    @Query() query: OrdersQueryReqDto,
    @GetStoredUserDataFromResponse() { user }: IUserData,
  ): Promise<OrdersListResDto> {
    const [ordersArray, total] = await this.orderService.getOrdersByQuery(
      query,
      user,
    );
    return this.ordersPresenter.toOrderListDto(ordersArray, query, total);
  }

  // get order by id -------------------------------------------
  @ApiOperation({ summary: 'Fetch a specific order using its order ID.' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:38:15.306Z',
      path: '/orders?page=1&order=DESC&orderBy=id',
    },
  })
  @ApiNotFoundResponse({
    description: 'Order not found',
    example: {
      statusCode: 404,
      messages: ['Order does not exist'],
      timestamp: '2025-01-29T21:21:29.843Z',
      path: '/order/:id',
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
  // Edit order by id -------------------------------------------
  @ApiOperation({ summary: 'Update order by ID.' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:38:15.306Z',
      path: '/order/:id',
    },
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    example: {
      statusCode: 404,
      messages: ['Order does not exist'],
      timestamp: '2025-01-29T21:21:29.843Z',
      path: '/order/:id',
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    example: {
      statusCode: 400,
      messages: ['age must not be greater than 120'],
      timestamp: '2025-01-29T21:21:29.843Z',
      path: '/order/:id',
    },
  })
  @ApiBearerAuth('Access-Token')
  @UseGuards(JwtAccessGuard, OrderOwnershipGuard)
  @Patch('/:id')
  public async editOrderById(
    @Param('id', ParseIntPipe) order_id: number,
    @GetStoredOrderDataFromResponse() { order }: IOrderData,
    @GetStoredUserDataFromResponse() { user }: IUserData,
    @Body() dto: OrderReqDto,
  ): Promise<OrderResDto> {
    return this.ordersPresenter.toOrderResDto(
      await this.orderService.editOrderById(user, order, dto),
    );
  }
  // Add comment to order by id -------------------------------------------
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:38:15.306Z',
      path: '/orders?page=1&order=DESC&orderBy=id',
    },
  })
  @ApiOperation({ summary: 'Add comment to order by id' })
  @ApiBearerAuth('Access-Token')
  @UseGuards(JwtAccessGuard, OrderOwnershipGuard)
  @Post('/:id/comment')
  public async addComment(
    @GetStoredOrderDataFromResponse() { order }: IOrderData,
    @GetStoredUserDataFromResponse() { user }: IUserData,
    @Body() dto: CommentReqDto,
  ): Promise<OrderResDto> {
    return this.ordersPresenter.toOrderResDto(
      await this.commentService.addComment(dto, user, order),
    );
  }
}
