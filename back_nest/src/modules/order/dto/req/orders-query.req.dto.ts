import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, Min } from 'class-validator';

import { OrderEnum } from '../../enums/order.enum';
import { OrderByEnum } from '../../enums/order-by.enum';
import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class OrdersQueryReqDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty()
  public readonly page: number = 1;

  @Transform(TransformHelper.trim)
  @IsNotEmpty()
  @IsEnum(OrderEnum)
  @ApiProperty({
    description: 'Sorted order',
    default: OrderEnum.DESC,
  })
  public readonly sort: OrderEnum;

  @Transform(TransformHelper.trim)
  @IsNotEmpty()
  @IsEnum(OrderByEnum)
  @ApiProperty({
    description: 'Sorted by ...',
    default: OrderByEnum.ID,
  })
  public readonly sortBy: OrderByEnum;
}
