import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ActivateTokenEntity } from '../../../database/entities/activate-token.entity';

@Injectable()
export class ActivateTokensRepository extends Repository<ActivateTokenEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ActivateTokenEntity, dataSource.manager);
  }

  public async isActivateTokenExist(
    token: string,
    em?: EntityManager,
  ): Promise<boolean> {
    const repository = em ? em.getRepository(ActivateTokenEntity) : this;
    return await repository.exists({
      where: [{ activate: token }],
    });
  }
}
