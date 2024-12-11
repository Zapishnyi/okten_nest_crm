import { createAsyncThunk, createSlice, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';
import IOrder from '../../interfaces/IOrder';
import { CRMApi } from '../../services/crm.api.servise';
import { AxiosError } from 'axios';
import IErrorResponse from '../../interfaces/IErrorResponse';
import { PaginationActions } from './paginationSlice';
import { navigateTo } from '../../helpers/navigate-to';

interface IInitial {
  orders: IOrder[];
  loadingState: boolean,
}

const initialState: IInitial = {
  orders: [],
  loadingState: false,
};

const searchForOrders = createAsyncThunk(
  'orders/searchForOrders',
  async (searchQuery: Record<string, string>, thunkAPI) => {
    try {
      const ordersPaginated = await CRMApi.orders.get(searchQuery);
      const { page, pages, total, limit } = ordersPaginated;
      thunkAPI.dispatch(PaginationActions.setPaginationData({ page, pages, total, limit }));
      return thunkAPI.fulfillWithValue(ordersPaginated.data);
    } catch (e) {
      const error = e as AxiosError<IErrorResponse>;
      if (error.status === 401) {
        navigateTo('/sign-in');
      } else {
        navigateTo('/error');
      }

      return thunkAPI.rejectWithValue(error.response?.data);

    } finally {
      thunkAPI.dispatch(OrdersActions.setLoadingState(false));
    }
  },
);


export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loadingState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchForOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addMatcher(
        isRejected(searchForOrders),
        (state, action) => {
          console.error(
            'Orders receive sequence failed with error:',
            action.payload,
          );
        })
      .addMatcher(
        isPending(searchForOrders),
        (state) => {
          state.loadingState = true;
        },
      );
  },
});

export const OrdersActions = {
  ...ordersSlice.actions, searchForOrders,
};