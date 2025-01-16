import { Transform } from 'class-transformer';
import { IsString, Length, Matches } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { regexp } from '../../../user/constants/regexp';

export class ActivateReqDto {
  @IsString()
  @Transform(TransformHelper.trim)
  @Length(5, 16, {
    message: '5 characters min,16 characters max ',
  })
  @Matches(regexp.validate_password, {
    message:
      'Password must contain  a digit, a lowercase letter,' +
      ' a uppercase letter, a special character, no space',
  })
  password: string;
}
