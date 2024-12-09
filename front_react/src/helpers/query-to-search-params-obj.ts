import IOrderQuery from '../interfaces/IOrderQuery';

export const queryToSearchParams = (query: IOrderQuery): Record<string, string> => {
  return {
    page: query.page.toString(),
    sortBy: query.sortBy.toString(),
    sort: query.sort.toString(),
  };
};