import { PickType } from '@nestjs/swagger';
import { UserBaseReqDto } from '../base/user-base.req.dto';

export class AdminSelfCreateReqDto extends PickType(UserBaseReqDto, [
  'name',
  'surname',
  'password',
  'email',
  'active',
  'role',
]) {}