import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AuthTokenEntity } from '../../../database/entities/auth-token.entity';

@Injectable()
export class AuthTokensRepository extends Repository<AuthTokenEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AuthTokenEntity, dataSource.manager);
  }

  public async isAuthTokenExist(token: string): Promise<boolean> {
    return await this.exists({
      where: [{ refresh: token }, { access: token }],
    });
  }
}
