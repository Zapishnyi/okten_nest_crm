import { PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from '../base/user-base.req.dto';

export class UserSignInReqDto extends PickType(UserBaseReqDto, [
  'email',
  'password',
]) {}
