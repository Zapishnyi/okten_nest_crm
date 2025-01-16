import { ApiProperty } from '@nestjs/swagger';

import { OrdersSortByEnum } from '../../enums/orders-sort-by.enum';
import { SortEnum } from '../../enums/sort.enum';
import { OrderResDto } from './order.res.dto';

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
  @ApiProperty({ enum: SortEnum, example: SortEnum.DESC })
  sort: SortEnum;
  @ApiProperty({ enum: OrdersSortByEnum, example: OrdersSortByEnum.ID })
  sortBy: OrdersSortByEnum;
  @ApiProperty({
    required: false,
    description: 'Name',
    example: 'Joe',
  })
  name?: string;
}
