import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { CourseEnum } from '../../enums/course.enum';
import { CourseFormatEnum } from '../../enums/course-format.enum';
import { CourseTypeEnum } from '../../enums/course-type.enum';
import { OrdersSortByEnum } from '../../enums/orders-sort-by.enum';
import { SortEnum } from '../../enums/sort.enum';
import { StatusEnum } from '../../enums/status.enum';

export class OrdersQueryReqDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'Page' })
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
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Name',
    // example: 'Joe',
  })
  readonly name?: string;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Surname',
  })
  readonly surname?: string;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Email',
  })
  readonly email?: string;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Phone',
  })
  readonly phone?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    description: 'Age',
  })
  readonly age?: number;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @IsEnum(CourseEnum)
  @ApiProperty({ description: 'Course name abbreviation', enum: CourseEnum })
  readonly course?: CourseEnum;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @IsEnum(CourseFormatEnum)
  @ApiProperty({ description: 'Course format', enum: CourseFormatEnum })
  readonly course_format?: CourseFormatEnum;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @IsEnum(CourseTypeEnum)
  @ApiProperty({ description: 'Course type', enum: CourseTypeEnum })
  readonly course_type?: CourseTypeEnum;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @IsEnum(StatusEnum)
  @ApiProperty({ description: 'Status of order', enum: StatusEnum })
  readonly status?: StatusEnum;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    minLength: 3,
    maxLength: 25,
    description: 'Group name',
  })
  readonly group?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Search among my orders only',
  })
  readonly my_orders?: boolean;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'Search from this date',
  })
  readonly upper_date?: Date;
  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'Search before this date',
  })
  readonly lower_date?: Date;
}
