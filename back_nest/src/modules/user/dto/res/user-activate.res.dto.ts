import { UserNoStatisticResDto } from './user-no-statistic.res.dto';

export class UserActivateResDto {
  activateToken: string;
  user: UserNoStatisticResDto;
}
