import { UserResDto } from './user.res.dto';

export class UserActivateResDto {
  activateToken: string;
  user: UserResDto;
}
