import { OrderEnum } from '../../enums/order.enum';
import { OrderByEnum } from '../../enums/order-by.enum';
import { OrderResDto } from './order.res.dto';
import { ApiProperty } from '@nestjs/swagger';

export class OrdersListResDto {
  @ApiProperty({ type: [OrderResDto] })
  data: OrderResDto[];
  @ApiProperty({ example: 245 })
  total: number;
  @ApiProperty({ example: 25 })
  limit: number;
  @ApiProperty({ example: 3 })
  page: number;
  @ApiProperty({ example: 3 })
  pages: number;
  @ApiProperty({ enum: OrderEnum, example: OrderEnum.DESC })
  sort: OrderEnum;
  @ApiProperty({ enum: OrderByEnum, example: OrderByEnum.ID })
  sortBy: OrderByEnum;
}
