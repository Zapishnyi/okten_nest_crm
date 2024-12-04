import { UserBaseReqDto } from '../base/user-base.req.dto';
import { PickType } from '@nestjs/swagger';

export class UserSingInReqDTO extends PickType(UserBaseReqDto, [
  'email',
  'password',
]) {}
