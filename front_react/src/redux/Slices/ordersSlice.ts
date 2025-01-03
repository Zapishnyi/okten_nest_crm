import { createAsyncThunk, createSlice, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';
import IOrder from '../../interfaces/IOrder';
import { CRMApi } from '../../services/crm.api.servise';
import { PaginationActions } from './paginationSlice';
import { navigateTo } from '../../helpers/navigate-to';
import { errorHandle } from '../../helpers/error-handle';

interface IInitial {
  orders: IOrder[];
  ordersLoadingState: boolean,
}

const initialState: IInitial = {
  orders: [],
  ordersLoadingState: false,
};

const searchForOrders = createAsyncThunk(
  'orders/searchForOrders',
  async (searchQuery: Record<string, string>, thunkAPI) => {
    try {
      console.log('search for orders');
      const ordersPaginated = await CRMApi.orders.get(searchQuery);
      const { page, pages, total, limit } = ordersPaginated;
      thunkAPI.dispatch(PaginationActions.setPaginationData({ page, pages, total, limit }));
      return thunkAPI.fulfillWithValue(ordersPaginated.data.map(e => ({
        ...e,
        created_at: (new Date(e.created_at)).toLocaleDateString('en-GB'),
      })));
    } catch (e) {
      const error = errorHandle(e);
      if (error.status === 401) {
        navigateTo('/auth/sign-in');
      } else {
        navigateTo('/error');
      }
      return thunkAPI.rejectWithValue(error.message);
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
      state.ordersLoadingState = action.payload;
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
          state.ordersLoadingState = true;
        },
      );
  },
});

export const OrdersActions = {
  ...ordersSlice.actions, searchForOrders,
};