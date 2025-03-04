import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager } from 'typeorm';

import { mockActivateToken } from '../auth/__mocks__/activate-token.mock';
import { TokenService } from '../auth/services/token.service';
import { mockStatistic } from '../order/__mocks__/statistic.mock';
import { OrderService } from '../order/services/order.service';
import { AuthTokensRepository } from '../repository/services/auth-tokens-repository.service';
import { IsolationLevelsEnum } from '../transaction-isolation-level/enums/isolationLevels.enum';
import { IsolationLevelService } from '../transaction-isolation-level/isolation-level.service';
import { mockUserActivate } from './__mocks__/user-activate.mock';
import { mockUserCreateReq } from './__mocks__/user-create-req.mock';
import { mockUserCreateRes } from './__mocks__/user-create-res.mock';
import { mockUserEntity } from './__mocks__/user-entity.mock';
import { mockUsersQuery } from './__mocks__/user-query.mock';
import { mockUsersRaw } from './__mocks__/user-raw.mock';
import { mockUsers } from './__mocks__/user-res.mock';
import { AdminController } from './admin.controller';
import { AdminService } from './services/admin.service';
import { UserPresenterService } from './services/user-presenter.service';

describe(AdminController.name, () => {
  let adminController: AdminController;
  let adminService: AdminService;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
            userBanReinstate: jest.fn().mockResolvedValue(mockUserEntity),
            userDelete: jest.fn().mockResolvedValue({}),
            groupDelete: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    adminController = module.get<AdminController>(AdminController);
    adminService = module.get<AdminService>(AdminService);
    orderService = module.get<OrderService>(OrderService);
  });

  it('adminController should be defined', () => {
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
    it('should return an array of mapped users', async () => {
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

  // User ban or reinstate --------------------------------------------------
  describe('userBanReinstate', () => {
    it('should ban or reinstate a user', async () => {
      jest.spyOn(adminService, 'userBanReinstate');
      const result = await adminController.userBanReinstate(1, {
        user: mockUserEntity,
        device: 'device',
      });

      expect(result).toEqual(mockUserCreateRes);
    });
  });

  describe('userDelete', () => {
    it('should delete a user', async () => {
      const userId = 1;
      jest.spyOn(adminService, 'userDelete');
      await adminController.userDelete(userId);
      expect(adminService.userDelete).toHaveBeenCalledTimes(1);
    });
  });
  // Group delete --------------------------------------------------
  describe('groupDelete', () => {
    it('should delete a group', async () => {
      jest.spyOn(adminService, 'groupDelete');
      await adminController.groupDelete(1);
      expect(adminService.groupDelete).toHaveBeenCalledTimes(1);
    });
  });
});
