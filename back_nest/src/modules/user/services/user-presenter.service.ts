import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../database/entities/user.entity';
import { UserResDto } from '../dto/res/user.res.dto';

@Injectable()
export class UserPresenterService {
  public toResponseDto({
    name,
    created_at,
    id,
    email,
    surname,
    active,
    ban,
    role,
  }: UserEntity): UserResDto {
    return {
      id,
      name,
      surname,
      email,
      role,
      active,
      ban,
      created_at,
    };
  }
}
