import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../../repository/services/users-repository.service';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async isUserNotExistOrThrow(email: string): Promise<void> {
    if (await this.usersRepository.isEmailExist(email)) {
      throw new ConflictException('User is already exists');
    }
  }

  public async isUserExistOrThrow(email: string): Promise<void> {
    if (!(await this.usersRepository.isEmailExist(email))) {
      throw new UnauthorizedException('User is not exists');
    }
  }
}
