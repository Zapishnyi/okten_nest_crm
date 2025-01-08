import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { ordersSlice } from './Slices/ordersSlice';
import { paginationSlice } from './Slices/paginationSlice';
import { usersSlice } from './Slices/usersSlice';

export const store = configureStore({
  reducer: {
    orders: ordersSlice.reducer,
    pagination: paginationSlice.reducer,
    users: usersSlice.reducer,
  },
});

export const useAppSelector =
  useSelector.withTypes<ReturnType<typeof store.getState>>();

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();