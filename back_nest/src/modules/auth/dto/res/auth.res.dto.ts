import { AuthTokenPairResDto } from './auth-tokens-pair.res.dto';
import { UserResDto } from '../../../user/dto/res/user.res.dto';

export class AuthResDto {
  tokens: AuthTokenPairResDto;
  user: UserResDto;
}
