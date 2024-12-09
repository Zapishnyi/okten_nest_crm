import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IOrderQuery from '../../interfaces/IOrderQuery';
import { initialQuery } from '../../constants/initialQuery';

interface IInitial {
  orderQuery: IOrderQuery;
}

const initialState: IInitial = {
  orderQuery: initialQuery,
};

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<IOrderQuery>) => {
      state.orderQuery = action.payload;
    },
  },
});

export const QueryActions = {
  ...querySlice.actions,
};