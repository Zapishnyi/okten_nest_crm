import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvConfigType } from '../../../configs/envConfigType';
import { UserEntity } from '../../../database/entities/user.entity';
import { UserResDto } from '../dto/res/user.res.dto';

@Injectable()
export class UserPresenterService {
  constructor(private readonly configService: ConfigService<EnvConfigType>) {}

  // public toUserListDto(
  //   usersList: UserEntity[],
  //   { page, limit, plan, role, search, car_id, user_id }: GetUsersQueryReqDto,
  //   total: number,
  // ): UserListResDto {
  //   return {
  //     data: usersList.map((user) => this.toResponseListItemDto(user)),
  //     total,
  //     limit,
  //     page,
  //     pages: Math.ceil(total / limit),
  //     plan,
  //     role,
  //     search,
  //     user_id,
  //     car_id,
  //   };
  // }

  // public toResponseListItemDto(user: UserEntity): UserListItemResDto {
  //   const awsConfig = this.configService.get<AwsConfig>('aws');
  //   return {
  //     id: user.id,
  //     first_name: user.first_name,
  //     last_name: user.last_name,
  //     email: user.email,
  //     phone: user.phone,
  //     role: user.role,
  //     plan: user.plan,
  //     ban: user.ban,
  //     verify: user.verify,
  //     avatar_image: user.avatar_image
  //       ? `${awsConfig.bucketURL}/${user.avatar_image}`
  //       : null,
  //     created: user.created,
  //     updated: user.updated,
  //     cars: user.cars,
  //   };
  // }

  public toResponseDto({
    name,
    created_at,
    id,
    email,
    surname,
    active,
    ban,
    role,
  }: UserEntity): UserResDto {
    return {
      id,
      name,
      surname,
      email,
      role,
      active,
      ban,
      created_at,
    };
  }
}
