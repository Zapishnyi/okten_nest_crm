import { PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from '../base/user-base.req.dto';

export class UserCreateByAdminReqDto extends PickType(UserBaseReqDto, [
  'name',
  'surname',
  'email',
]) {}
