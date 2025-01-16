import { ConflictException, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { GroupEntity } from '../../../database/entities/group.entity';
import { IsolationLevelService } from '../../transaction-isolation-level/isolation-level.service';
import { GroupReqDto } from '../dto/req/group.req.dto';

@Injectable()
export class GroupService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly isolationLevel: IsolationLevelService,
  ) {}

  public async getAllGroups(): Promise<GroupEntity[]> {
    return await this.entityManager.transaction(
      this.isolationLevel.set(),
      async (em: EntityManager): Promise<GroupEntity[]> => {
        const groupRepositoryEM = em.getRepository(GroupEntity);
        return await groupRepositoryEM.find();
      },
    );
  }

  public async addGroup(dto: GroupReqDto): Promise<GroupEntity> {
    return await this.entityManager.transaction(
      this.isolationLevel.set(),
      async (em: EntityManager): Promise<GroupEntity> => {
        const groupRepositoryEM = em.getRepository(GroupEntity);
        const isGroupExist = !!(await groupRepositoryEM.count({
          where: { name: dto.name },
        }));
        if (isGroupExist) {
          throw new ConflictException('Such a group is already exist');
        } else {
          return await groupRepositoryEM.save(groupRepositoryEM.create(dto));
        }
      },
    );
  }
}
