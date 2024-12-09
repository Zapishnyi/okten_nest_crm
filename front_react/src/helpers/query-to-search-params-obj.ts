import IOrderQuery from '../interfaces/IOrderQuery';

export const queryToSearchParams = (query: IOrderQuery): Record<string, string> => {
  return {
    page: query.page.toString(),
    orderBy: query.orderBy.toString(),
    order: query.order.toString(),
  };
};