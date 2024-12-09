import React, { ChangeEvent, FC, MouseEvent, MutableRefObject } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { queryToSearchParams } from '../../helpers/query-to-search-params-obj';
import { QueryActions } from '../../redux/Slices/querySlice';
import { sortToggle } from '../../helpers/sort-toggle';
import { SortByEnum } from '../../enums/sort-by.enum';

interface IProps {
  cellName: string;
  setQuery: SetURLSearchParams;
  chosenColumnRef: MutableRefObject<string>;
}

const TitleRowCell: FC<IProps> = ({ cellName, setQuery, chosenColumnRef }) => {
  console.log('.');
  const { orderQuery } = useAppSelector((state) => state.orderQuery);
  const dispatch = useAppDispatch();
  const changeHandle = (event: ChangeEvent<HTMLInputElement>) => {

    if (chosenColumnRef.current === event.currentTarget.value) {
      dispatch(QueryActions.setQuery({
        ...orderQuery,
        sort: sortToggle(orderQuery.sort),
        sortBy: event.currentTarget.value as SortByEnum,
      }));
    } else {
      dispatch(QueryActions.setQuery({ ...orderQuery, sortBy: event.currentTarget.value as SortByEnum }));
    }
    chosenColumnRef.current = event.currentTarget.value;
    setQuery(queryToSearchParams(orderQuery));
  };
  const clickHandle = (event: MouseEvent<HTMLInputElement>) => {
    if (chosenColumnRef.current === event.currentTarget.value) {
      dispatch(QueryActions.setQuery({
        ...orderQuery,
        sort: sortToggle(orderQuery.sort),
      }));
    }

  };
  return <th>
    <label>
      <input className={'title'} onClick={clickHandle} onChange={changeHandle} type="radio"
             value={cellName} name={'orderBy'} checked={cellName === orderQuery.sortBy} /> {cellName}
    </label>
  </th>;
};

export default TitleRowCell;