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
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Name',
    // example: 'Joe',
  })
  readonly name?: string;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Surname',
  })
  readonly surname?: string;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Email',
  })
  readonly email?: string;

  @IsOptional()
  @IsString()
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
  @IsEnum(CourseTypeEum)
  @ApiProperty({ description: 'Course type', enum: CourseTypeEum })
  readonly course_type?: CourseTypeEum;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @IsEnum(StatusEnum)
  @ApiProperty({ description: 'Status of order', enum: StatusEnum })
  readonly status?: StatusEnum;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    minLength: 3,
    maxLength: 25,
    description: 'Group name',
  })
  readonly group?: string;
}
