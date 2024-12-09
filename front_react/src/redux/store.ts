import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { querySlice } from './Slices/querySlice';
import { ordersSlice } from './Slices/ordersSlice';
import { paginationSlice } from './Slices/paginationSlice';

export const store = configureStore({
  reducer: {
    orderQuery: querySlice.reducer,
    orders: ordersSlice.reducer,
    pagination: paginationSlice.reducer,
  },
});

export const useAppSelector =
  useSelector.withTypes<ReturnType<typeof store.getState>>();

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();