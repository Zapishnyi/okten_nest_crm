import { PickType } from '@nestjs/swagger';
import { UserBaseReqDto } from '../base/user-base.req.dto';

export class UserValidateReqDto extends PickType(UserBaseReqDto, [
  'password',
]) {}
