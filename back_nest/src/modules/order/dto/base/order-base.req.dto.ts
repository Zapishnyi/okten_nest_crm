import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { CourseEnum } from '../../enums/course.enum';
import { CourseFormatEnum } from '../../enums/course-format.enum';
import { CourseTypeEnum } from '../../enums/course-type.enum';
import { StatusEnum } from '../../enums/status.enum';

export class OrderBaseReqDto {
  @ApiProperty({ example: '245' })
  readonly id: number;

  @IsOptional()
  @IsString()
  @Length(2, 25)
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.emptyToUndefined)
  @ApiProperty({
    minLength: 2,
    maxLength: 25,
    description: 'Name',
    example: 'Joe',
  })
  readonly name?: string;

  @IsOptional()
  @IsString()
  @Length(2, 25)
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.emptyToUndefined)
  @ApiProperty({
    minLength: 2,
    maxLength: 25,
    description: 'Surname',
    example: 'Doe',
  })
  readonly surname?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @Length(2, 100)
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.emptyToUndefined)
  @ApiProperty({
    minLength: 2,
    maxLength: 100,
    description: 'Email',
    example: 'Joe.doe@example.com',
  })
  readonly email?: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('UA')
  @Length(6, 13)
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.emptyToUndefined)
  @ApiProperty({
    minLength: 6,
    maxLength: 13,
    description: 'Phone',
    example: '+380670000000',
  })
  readonly phone?: string;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toNumber)
  @IsNumber()
  @Transform(TransformHelper.emptyToUndefined)
  @Min(16)
  @Max(120)
  @ApiProperty({
    maximum: 120,
    minimum: 16,
    description: 'Age',
    example: 24,
  })
  readonly age?: number;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.emptyToUndefined)
  @IsEnum(CourseEnum)
  @ApiProperty({ enum: CourseEnum, example: CourseEnum.QACX })
  readonly course?: CourseEnum;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.emptyToUndefined)
  @IsEnum(CourseFormatEnum)
  @ApiProperty({ enum: CourseFormatEnum, example: CourseFormatEnum.ONLINE })
  readonly course_format?: CourseFormatEnum;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.emptyToUndefined)
  @IsEnum(CourseTypeEnum)
  @ApiProperty({ enum: CourseTypeEnum, example: CourseTypeEnum.VIP })
  readonly course_type?: CourseTypeEnum;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toNumber)
  @IsNumber()
  @Transform(TransformHelper.emptyToUndefined)
  @Min(0)
  @ApiProperty({
    minimum: 0,
    description: 'Sum total',
    example: 3353,
  })
  readonly sum?: number;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toNumber)
  @IsNumber()
  @Transform(TransformHelper.emptyToUndefined)
  @Min(0)
  @ApiProperty({
    minimum: 0,
    description: 'Sum paid',
    example: 3353,
  })
  readonly alreadyPaid?: number;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.emptyToUndefined)
  @ApiProperty({
    minLength: 0,
    maxLength: 100,
    description: 'UTM codes',
    example: 'html-2022-5-1_target-05-2022',
  })
  readonly utm?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.emptyToUndefined)
  @ApiProperty({
    minLength: 0,
    maxLength: 100,
    description: 'Message',
    example: 'Any text here',
  })
  readonly msg?: string;

  @IsOptional()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.emptyToUndefined)
  @IsEnum(StatusEnum)
  @ApiProperty({ enum: StatusEnum, example: StatusEnum.IN_WORK })
  readonly status?: StatusEnum;

  @IsOptional()
  @IsString()
  @Length(3, 25)
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.emptyToUndefined)
  @ApiProperty({
    minLength: 3,
    maxLength: 25,
    description: 'Group name',
    example: 'Jan2024',
  })
  readonly group?: string;
}
