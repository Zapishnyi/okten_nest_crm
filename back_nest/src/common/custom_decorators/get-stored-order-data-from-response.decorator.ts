import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import IOrderData from '../../modules/order/Interfaces/IOrderData';

export const GetStoredOrderDataFromResponse = createParamDecorator(
  (data, context: ExecutionContext): IOrderData =>
    context.switchToHttp().getRequest().order_data.order,
);
