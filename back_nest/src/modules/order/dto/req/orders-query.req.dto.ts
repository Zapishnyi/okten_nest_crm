import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

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
  @ApiProperty({
    description: 'Sorted order',
    default: OrderEnum.DESC,
  })
  public readonly order: OrderEnum;

  @Transform(TransformHelper.trim)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Sorted by ...',
    default: OrderByEnum.ID,
  })
  public readonly orderBy: OrderByEnum;
}
