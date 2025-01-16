import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { CourseEnum } from '../../enums/course.enum';
import { CourseFormatEnum } from '../../enums/course-format.enum';
import { CourseTypeEum } from '../../enums/course-type.enum';
import { OrdersSortByEnum } from '../../enums/orders-sort-by.enum';
import { SortEnum } from '../../enums/sort.enum';
import { StatusEnum } from '../../enums/status.enum';

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

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Name',
    example: 'Joe',
  })
  readonly name?: string;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Surname',
    example: 'Doe',
  })
  readonly surname?: string;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Email',
    example: 'Joe.doe@example.com',
  })
  readonly email?: string;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Phone',
    example: '+380670000000',
  })
  readonly phone?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Age',
    example: 24,
  })
  readonly age?: number;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @IsEnum(CourseEnum)
  @ApiProperty({ enum: CourseEnum, example: CourseEnum.QACX })
  readonly course?: CourseEnum;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @IsEnum(CourseFormatEnum)
  @ApiProperty({ enum: CourseFormatEnum, example: CourseFormatEnum.ONLINE })
  readonly course_format?: CourseFormatEnum;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @IsEnum(CourseTypeEum)
  @ApiProperty({ enum: CourseTypeEum, example: CourseTypeEum.VIP })
  readonly course_type?: CourseTypeEum;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @IsEnum(StatusEnum)
  @ApiProperty({ enum: StatusEnum, example: StatusEnum.IN_WORK })
  readonly status?: StatusEnum;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    minLength: 3,
    maxLength: 25,
    description: 'Group name',
    example: 'Jan2024',
  })
  readonly group?: string;
}
