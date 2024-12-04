import { PickType } from '@nestjs/swagger';
import { UserBaseResDto } from '../base/user-base.res.dto';

export class UserResDto extends PickType(UserBaseResDto, [
  'id',
  'name',
  'surname',
  'email',
  'role',
  'active',
  'ban',
  'created_at',
]) {}
