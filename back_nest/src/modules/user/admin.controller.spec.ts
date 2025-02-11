import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager } from 'typeorm';

import { mockActivateToken } from '../auth/__mocks__/activate-token.mock';
import { TokenService } from '../auth/services/token.service';
import { mockStatistic } from '../order/__mocks__/statistic.mock';
import { OrderService } from '../order/services/order.service';
import { AuthTokensRepository } from '../repository/services/auth-tokens-repository.service';
import { IsolationLevelsEnum } from '../transaction-isolation-level/enums/isolationLevels.enum';
import { IsolationLevelService } from '../transaction-isolation-level/isolation-level.service';
import { mockUsersQuery } from './__mocks__/user-activate.mock';
import { mockUserCreateReq } from './__mocks__/user-create-req.mock';
import { mockUserCreateRes } from './__mocks__/user-create-res.mock';
import { mockUserEntity } from './__mocks__/user-entity.mock';
import { mockUserActivate } from './__mocks__/user-query.mock';
import { mockUsersRaw } from './__mocks__/user-raw.mock';
import { mockUsers } from './__mocks__/user-res.mock';
import { AdminController } from './admin.controller';
import { AdminService } from './services/admin.service';
import { UserPresenterService } from './services/user-presenter.service';

describe('AdminController', () => {
  let adminController: AdminController;
  let adminService: AdminService;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [OrderModule],
      controllers: [AdminController],
      providers: [
        UserPresenterService,
        EntityManager,
        {
          provide: OrderService,
          useValue: {
            getOrdersStatusStatistic: jest
              .fn()
              .mockResolvedValue(mockStatistic),
          },
        },

        {
          provide: TokenService,
          useValue: {
            verifyToken: jest.fn().mockResolvedValue({
              user_id: 2,
              device: 'device',
            }),
            generateAuthTokens: jest.fn().mockResolvedValue({}),
            generateActivateToken: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: AuthTokensRepository,
          useValue: {
            isAuthTokenExist: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: IsolationLevelService,
          useValue: {
            set: jest.fn().mockReturnValue(IsolationLevelsEnum.READ_COMMITTED),
          },
        },
        {
          provide: AdminService,
          useValue: {
            getAllUsers: jest.fn().mockResolvedValue(mockUsersRaw),
            userActivate: jest
              .fn()
              .mockResolvedValue([mockActivateToken, mockUserEntity]),
            userCreate: jest.fn().mockResolvedValue(mockUserEntity),
            userBanReinstate: jest.fn(),
            userDelete: jest.fn(),
            deleteGroup: jest.fn(),
          },
        },
      ],
    }).compile();

    adminController = module.get<AdminController>(AdminController);
    adminService = module.get<AdminService>(AdminService);
    orderService = module.get<OrderService>(OrderService);
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

  // User activate --------------------------------------------------
  describe('userActivate', () => {
    it('should return an activation token and user data', async () => {
      jest.spyOn(adminService, 'userActivate');
      const result = await adminController.userActivate(1);
      expect(result).toEqual(mockUserActivate);
    });
  });

  // Get orders statistic ----------------------------------------------
  describe('getOrdersStatusStatistic', () => {
    it('should return an order status statistic', async () => {
      jest.spyOn(orderService, 'getOrdersStatusStatistic');
      const result = await adminController.getOrdersStatusStatistic();
      expect(result).toEqual(
        expect.objectContaining({
          Total: expect.any(Number),
          New: expect.any(Number),
          In_work: expect.any(Number),
          Agree: expect.any(Number),
          Disagree: expect.any(Number),
          Dubbing: expect.any(Number),
        }),
      );
    });
  });

  // User create --------------------------------------------------

  describe('userCreate', () => {
    it('should create a new user and return user data', async () => {
      jest.spyOn(adminService, 'userCreate');
      const result = await adminController.userCreate(mockUserCreateReq);
      expect(result).toEqual(mockUserCreateRes);
    });
  });

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
