import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager } from 'typeorm';

import { TokenService } from '../auth/services/token.service';
import { SortEnum } from '../order/enums/sort.enum';
import { OrderService } from '../order/services/order.service';
import { AuthTokensRepository } from '../repository/services/auth-tokens-repository.service';
import { IsolationLevelService } from '../transaction-isolation-level/isolation-level.service';
import { AdminController } from './admin.controller';
import { UsersQueryReqDto } from './dto/req/users-query.req.dto';
import { UserResDto } from './dto/res/user.res.dto';
import { UserActivateResDto } from './dto/res/user-activate.res.dto';
import { UserRoleEnum } from './enums/user-role.enum';
import { UsersSortByEnum } from './enums/users-sort-by.enum';
import IUserRaw from './interfaces/IUserRaw';
import { AdminService } from './services/admin.service';
import { UserService } from './services/user.service';
import { UserPresenterService } from './services/user-presenter.service';

describe('AdminController', () => {
  let adminController: AdminController;
  let adminService: AdminService;

  const mockUsersQuery: UsersQueryReqDto = {
    sortBy: UsersSortByEnum.ID,
    sort: SortEnum.DESC,
  };

  const mockUsersRaw: IUserRaw[] = [
    {
      id: 1,
      name: 'John Doe',
      surname: 'Doe',
      email: 'johndoe@example.com',
      role: UserRoleEnum.MANAGER,
      active: true,
      ban: false,
      last_login: new Date('05-12-2023'),
      created_at: new Date('05-12-2023'),
      Total: 5,
      New: 0,
      In_work: 2,
      Agree: 0,
      Disagree: 3,
      Dubbing: 0,
    },
  ];
  const mockUserActivate: UserActivateResDto = {
    activateToken: 'token',
    user: {
      id: 1,
      name: 'John Doe',
      surname: 'Doe',
      email: 'johndoe@example.com',
      role: UserRoleEnum.MANAGER,
      active: true,
      ban: false,
      last_login: new Date('05-12-2023'),
      created_at: new Date('05-12-2023'),
    },
  };

  const mockUsers: UserResDto[] = [
    {
      id: 1,
      name: 'John Doe',
      surname: 'Doe',
      email: 'johndoe@example.com',
      role: UserRoleEnum.MANAGER,
      active: true,
      ban: false,
      last_login: new Date('05-12-2023'),
      created_at: new Date('05-12-2023'),
      statistic: {
        Total: 5,
        New: 0,
        In_work: 2,
        Agree: 0,
        Disagree: 3,
        Dubbing: 0,
      },
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            getOrder: jest.fn(),
          },
        },

        { provide: IsolationLevelService, useValue: { set: jest.fn() } },
        {
          provide: AuthTokensRepository,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: TokenService,
          useValue: { generateAuthTokens: jest.fn() },
        },
        {
          provide: AdminService,
          useValue: {
            getAllUsers: jest.fn().mockResolvedValue(mockUsersRaw),
            userActivate: jest.fn().mockResolvedValue(mockUserActivate),
            userCreate: jest.fn(),
            userBanReinstate: jest.fn(),
            userDelete: jest.fn(),
            deleteGroup: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            isUserExistOrThrow: jest.fn(),
            isUserNotExistOrThrow: jest.fn(),
          },
        },
        EntityManager,
        UserPresenterService,
      ],
    }).compile();

    adminController = module.get<AdminController>(AdminController);
    adminService = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(adminController).toBeDefined();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  // Get all users --------------------------------------------------
  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      jest.spyOn(adminService, 'getAllUsers');
      const result = await adminController.getAllUsers(mockUsersQuery);
      expect(result).toEqual(mockUsers);
    });
  });

  // Activate user --------------------------------------------------
  describe('userActivate', () => {
    it('should return an activation token and user data', async () => {
      const userId = 1;
      const activateToken = 'token';

      jest.spyOn(adminService, 'userActivate');
      const result = await adminController.userActivate(userId);
      expect(result).toEqual({ activateToken });
    });
  });

  // describe('getOrdersStatusStatistic', () => {
  //   it('should return an order status statistic', async () => {
  //     const statistic = { pending: 10, completed: 20 };
  //     jest
  //       .spyOn(orderService, 'getOrdersStatusStatistic')
  //       .mockResolvedValue(statistic);
  //     const result = await controller.getOrdersStatusStatistic();
  //     expect(result).toEqual(statistic);
  //   });
  // });

  // describe('userCreate', () => {
  //   it('should create a new user and return user data', async () => {
  //     const dto = { name: 'John Doe', email: 'johndoe@example.com' };
  //     const user = { id: 1, name: 'John Doe', email: 'johndoe@example.com' };
  //     jest.spyOn(adminService, 'userCreate').mockResolvedValue(user);
  //     const result = await controller.userCreate(dto);
  //     expect(result).toEqual(user);
  //   });
  // });

  // describe('userBanReinstate', () => {
  //   it('should ban or reinstate a user and return user data', async () => {
  //     const userId = 1;
  //     const user = { id: 1, name: 'John Doe' };
  //     jest.spyOn(adminService, 'userBanReinstate').mockResolvedValue(user);
  //     const result = await controller.userBanReinstate(userId, user);
  //     expect(result).toEqual(user);
  //   });
  // });

  // describe('userDelete', () => {
  //   it('should delete a user', async () => {
  //     const userId = 1;
  //     jest.spyOn(adminService, 'userDelete').mockResolvedValue();
  //     await controller.userDelete(userId);
  //     expect(adminService.userDelete).toHaveBeenCalledTimes(1);
  //   });
  // });

  // describe('deleteGroup', () => {
  //   it('should delete a group', async () => {
  //     const groupId = 1;
  //     jest.spyOn(adminService, 'deleteGroup').mockResolvedValue();
  //     await controller.deleteGroup(groupId);
  //     expect(adminService.deleteGroup).toHaveBeenCalledTimes(1);
  //   });
  // });
});
