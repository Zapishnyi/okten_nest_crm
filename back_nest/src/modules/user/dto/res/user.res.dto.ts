import { PickType } from '@nestjs/swagger';

import { UserBaseResDto } from '../base/user-base.res.dto';
import { OrderStatusStatisticResDto } from './order-status-statistic.res.dto';

export class UserResDto extends PickType(UserBaseResDto, [
  'id',
  'name',
  'surname',
  'email',
  'role',
  'active',
  'ban',
  'last_login',
  'created_at',
]) {
  statistic: OrderStatusStatisticResDto;
}
