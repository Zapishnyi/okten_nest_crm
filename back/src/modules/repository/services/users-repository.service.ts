import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../../../database/entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async isEmailExist(email: string): Promise<boolean> {
    return await this.exists({
      where: { email },
    });
  }
}
