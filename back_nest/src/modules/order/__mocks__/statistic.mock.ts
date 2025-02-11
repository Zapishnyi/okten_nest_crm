import { OrderStatusStatisticResDto } from '../../user/dto/res/order-status-statistic.res.dto';

export const mockStatistic: OrderStatusStatisticResDto = {
  Total: 5,
  New: 0,
  In_work: 2,
  Agree: 0,
  Disagree: 3,
  Dubbing: 0,
};

export const mockStatisticNull: OrderStatusStatisticResDto = {
  Total: 0,
  New: 0,
  In_work: 0,
  Agree: 0,
  Disagree: 0,
  Dubbing: 0,
};
