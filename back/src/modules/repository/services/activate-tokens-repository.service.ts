import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ActivateTokenEntity } from '../../../database/entities/activate-token.entity';

@Injectable()
export class ActivateTokensRepository extends Repository<ActivateTokenEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ActivateTokenEntity, dataSource.manager);
  }

  public async isActivateTokenExist(token: string): Promise<boolean> {
    return await this.exists({
      where: [{ activate: token }],
    });
  }
}
