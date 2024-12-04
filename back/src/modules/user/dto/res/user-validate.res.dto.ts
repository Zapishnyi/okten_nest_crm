import { UserResDto } from './user.res.dto';

export class UserValidateResDto {
  token: { activate: string };
  user: UserResDto;
}
