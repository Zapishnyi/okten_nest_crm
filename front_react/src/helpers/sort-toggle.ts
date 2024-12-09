import { SortEnum } from '../enums/sort.enum';

export const sortToggle = (current: SortEnum): SortEnum => {
  return current === SortEnum.DESC ? SortEnum.ASC : SortEnum.DESC;
};