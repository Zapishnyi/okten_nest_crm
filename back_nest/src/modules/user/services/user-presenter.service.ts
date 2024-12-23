import { Injectable } from '@nestjs/common';
import { UserResDto } from '../dto/res/user.res.dto';
import IUserRaw from '../interfaces/IUserRaw';
import { UserEntity } from '../../../database/entities/user.entity';

@Injectable()
export class UserPresenterService {
  public toResponseDtoFromRaw({
    name,
    created_at,
    id,
    email,
    surname,
    active,
    ban,
    role,
    total_orders,
    last_login,
  }: IUserRaw): UserResDto {
    return {
      id,
      name,
      surname,
      email,
      role,
      active: !!active,
      ban: !!ban,
      total_orders,
      last_login,
      created_at,
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
      total_orders: !!orders?.length ? orders.length : 0,
      last_login,
      created_at,
    };
  }
}
