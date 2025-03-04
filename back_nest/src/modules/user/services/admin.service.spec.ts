import { Test } from '@nestjs/testing';
import { EntityManager } from 'typeorm';

import { TokenService } from '../../auth/services/token.service';
import { UsersRepository } from '../../repository/services/users-repository.service';
import { IsolationLevelService } from '../../transaction-isolation-level/isolation-level.service';
import { AdminService } from './admin.service';
import { UserService } from './user.service';

describe(AdminService.name, () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: UsersRepository,
          useValue: {},
        },
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: TokenService,
          useValue: {},
        },
        {
          provide: EntityManager,
          useValue: {},
        },
        {
          provide: IsolationLevelService,
          useValue: {},
        },
      ],
    });
  });
});
