import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, Min } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { OrdersSortByEnum } from '../../enums/orders-sort-by.enum';
import { SortEnum } from '../../enums/sort.enum';

export class OrdersQueryReqDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty()
  public readonly page: number = 1;

  @Transform(TransformHelper.trim)
  @IsNotEmpty()
  @IsEnum(SortEnum)
  @ApiProperty({
    description: 'Sorted order',
    default: SortEnum.DESC,
  })
  public readonly sort: SortEnum;

  @Transform(TransformHelper.trim)
  @IsNotEmpty()
  @IsEnum(OrdersSortByEnum)
  @ApiProperty({
    description: 'Sorted by ...',
    default: OrdersSortByEnum.ID,
  })
  public readonly sortBy: OrdersSortByEnum;
}
