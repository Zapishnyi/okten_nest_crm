import { OmitType } from '@nestjs/swagger';

import { OrderBaseReqDto } from '../base/order-base.req.dto';

export class OrderReqDto extends OmitType(OrderBaseReqDto, [
  'id',
  'utm',
  'msg',
]) {}
