import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ordersSlice } from './Slices/ordersSlice';
import { paginationSlice } from './Slices/paginationSlice';
import { userSlice } from './Slices/userSlice';

export const store = configureStore({
  reducer: {
    orders: ordersSlice.reducer,
    pagination: paginationSlice.reducer,
    user: userSlice.reducer,
  },
});

export const useAppSelector =
  useSelector.withTypes<ReturnType<typeof store.getState>>();

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();