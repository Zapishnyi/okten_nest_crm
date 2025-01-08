import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import IPaginationData from '../../interfaces/IPaginationData';

interface IInitial {
  paginationData: {
    page: number,
    pages: number,
    total: number,
    limit: number,
  };
}

const initialState: IInitial = {
  paginationData: {
    page: 1,
    pages: 1,
    total: 0,
    limit: 25,
  },
};


export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPaginationData: (state, action: PayloadAction<IPaginationData>) => {
      state.paginationData = action.payload;
    },
  },


});

export const PaginationActions = {
  ...paginationSlice.actions,
};