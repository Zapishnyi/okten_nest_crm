import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IUserData } from '../../modules/auth/interfaces/IUserData';
import { OrdersRepository } from '../../modules/repository/services/orders-repository.service';

@Injectable()
export class OrderOwnershipGuard implements CanActivate {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request['user_data'] as IUserData;
    const order = await this.ordersRepository.findOne({
      where: { id: request.params.id },
      relations: ['user'],
    });

    if (!order) {
      throw new NotFoundException('Order does not exist');
    }
    if (order?.user?.id !== user?.id && order.user) {
      throw new UnauthorizedException();
    }
    request.order_data = {
      order,
    };
    return true;
  }
}
