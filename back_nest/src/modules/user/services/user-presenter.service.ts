import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../database/entities/user.entity';
import { StatusEnum } from '../../order/enums/status.enum';
import { OrderPresenterService } from '../../order/services/order-presenter.service';
import { UserResDto } from '../dto/res/user.res.dto';
import IUserRaw from '../interfaces/IUserRaw';

@Injectable()
export class UserPresenterService {
  constructor(private readonly orderPresenter: OrderPresenterService) {}

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
        Total: orders.length,
        New: orders.filter((e) => e.status === StatusEnum.NEW).length,
        In_work: orders.filter((e) => e.status === StatusEnum.IN_WORK).length,
        Agree: orders.filter((e) => e.status === StatusEnum.AGREE).length,
        Disagree: orders.filter((e) => e.status === StatusEnum.DISAGREE).length,
        Dubbing: orders.filter((e) => e.status === StatusEnum.DUBBING).length,
      },
    };
  }
}
