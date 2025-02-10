import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../database/entities/user.entity';
import { StatusEnum } from '../../order/enums/status.enum';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserNoStatisticResDto } from '../dto/res/user-no-statistic.res.dto';
import IUserRaw from '../interfaces/IUserRaw';

@Injectable()
export class UserPresenterService {
  public toResponseDtoFromRaw({
    name,
    id,
    email,
    surname,
    active,
    ban,
    role,
    last_login,
    created_at,
    Total,
    In_work,
    New,
    Agree,
    Disagree,
    Dubbing,
  }: IUserRaw): UserResDto {
    return {
      id,
      name,
      surname,
      email,
      role,
      active: !!active,
      ban: !!ban,
      last_login,
      created_at,
      statistic: {
        Total,
        New,
        In_work,
        Agree,
        Disagree,
        Dubbing,
      },
    };
  }

  public toResponseDtoFromEntity({
    name,
    created_at,
    id,
    email,
    surname,
    active,
    ban,
    role,
    orders,
    last_login,
  }: UserEntity): UserResDto {
    return {
      id,
      name,
      surname,
      email,
      role,
      active: !!active,
      ban: !!ban,
      last_login,
      created_at,
      statistic: {
        Total: orders ? orders?.length : 0,
        New: orders
          ? orders?.filter((e) => e.status === StatusEnum.NEW).length
          : 0,
        In_work: orders
          ? orders?.filter((e) => e.status === StatusEnum.IN_WORK).length
          : 0,
        Agree: orders
          ? orders?.filter((e) => e.status === StatusEnum.AGREE).length
          : 0,
        Disagree: orders
          ? orders?.filter((e) => e.status === StatusEnum.DISAGREE).length
          : 0,
        Dubbing: orders
          ? orders?.filter((e) => e.status === StatusEnum.DUBBING).length
          : 0,
      },
    };
  }
  public toUserNoStatisticResponseDtoFromEntity({
    name,
    created_at,
    id,
    email,
    surname,
    active,
    ban,
    role,
    last_login,
  }: UserEntity): UserNoStatisticResDto {
    return {
      id,
      name,
      surname,
      email,
      role,
      active: !!active,
      ban: !!ban,
      last_login,
      created_at,
    };
  }
}
