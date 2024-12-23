import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { SortEnum } from '../../../order/enums/sort.enum';
import { UsersSortByEnum } from '../../enums/users-sort-by.enum';

export class UsersQueryReqDto {
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
  @IsEnum(UsersSortByEnum)
  @ApiProperty({
    description: 'Sorted by ...',
    default: UsersSortByEnum.ID,
  })
  public readonly sortBy: UsersSortByEnum;
}
