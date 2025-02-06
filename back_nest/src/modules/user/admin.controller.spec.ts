import { Test, TestingModule } from '@nestjs/testing';

import { AdminRoleGuard } from '../../common/guards/admin-role.guard';
import { JwtAccessGuard } from '../../common/guards/jwt-access.guard';
import { OrderService } from '../order/services/order.service';
import { AdminController } from './admin.controller';
import { AdminService } from './services/admin.service';
import { UserPresenterService } from './services/user-presenter.service';

describe('AdminController', () => {
  let controller: AdminController;
  let adminService: AdminService;
  let userPresenterService: UserPresenterService;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        AdminService,
        UserPresenterService,
        OrderService,
        JwtAccessGuard,
        AdminRoleGuard,
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    adminService = module.get<AdminService>(AdminService);
    userPresenterService =
      module.get<UserPresenterService>(UserPresenterService);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const query = {};
      const users = [{ id: 1, name: 'John Doe' }];
      jest.spyOn(adminService, 'getAllUsers').mockResolvedValue(users);
      const result = await controller.getAllUsers(query);
      expect(result).toEqual(users);
    });
  });

  describe('userActivate', () => {
    it('should return an activation token and user data', async () => {
      const userId = 1;
      const activateToken = 'token';
      const user = { id: 1, name: 'John Doe' };
      jest
        .spyOn(adminService, 'userActivate')
        .mockResolvedValue([activateToken, user]);
      const result = await controller.userActivate(userId);
      expect(result).toEqual({ activateToken, user });
    });
  });

  describe('getOrdersStatusStatistic', () => {
    it('should return an order status statistic', async () => {
      const statistic = { pending: 10, completed: 20 };
      jest
        .spyOn(orderService, 'getOrdersStatusStatistic')
        .mockResolvedValue(statistic);
      const result = await controller.getOrdersStatusStatistic();
      expect(result).toEqual(statistic);
    });
  });

  describe('userCreate', () => {
    it('should create a new user and return user data', async () => {
      const dto = { name: 'John Doe', email: 'johndoe@example.com' };
      const user = { id: 1, name: 'John Doe', email: 'johndoe@example.com' };
      jest.spyOn(adminService, 'userCreate').mockResolvedValue(user);
      const result = await controller.userCreate(dto);
      expect(result).toEqual(user);
    });
  });

  describe('userBanReinstate', () => {
    it('should ban or reinstate a user and return user data', async () => {
      const userId = 1;
      const user = { id: 1, name: 'John Doe' };
      jest.spyOn(adminService, 'userBanReinstate').mockResolvedValue(user);
      const result = await controller.userBanReinstate(userId, user);
      expect(result).toEqual(user);
    });
  });

  describe('userDelete', () => {
    it('should delete a user', async () => {
      const userId = 1;
      jest.spyOn(adminService, 'userDelete').mockResolvedValue();
      await controller.userDelete(userId);
      expect(adminService.userDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteGroup', () => {
    it('should delete a group', async () => {
      const groupId = 1;
      jest.spyOn(adminService, 'deleteGroup').mockResolvedValue();
      await controller.deleteGroup(groupId);
      expect(adminService.deleteGroup).toHaveBeenCalledTimes(1);
    });
  });
});
