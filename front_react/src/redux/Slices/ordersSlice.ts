import { createAsyncThunk, createSlice, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';

import { errorHandle } from '../../helpers/error-handle';
import { navigateTo } from '../../helpers/navigate-to';
import IComment from '../../interfaces/IComment';
import IOrder from '../../interfaces/IOrder';
import IOrderEdit from '../../interfaces/IOrderEdit';
import { CRMApi } from '../../services/crm.api.servise';

import { PaginationActions } from './paginationSlice';

interface IInitial {
  chosenOrder: IOrder | null;
  orders: IOrder[];
  ordersLoadingState: boolean,
}

const initialState: IInitial = {
  chosenOrder: null,
  orders: [],
  ordersLoadingState: false,
};

const searchForOrders = createAsyncThunk(
  'orders/searchForOrders',
  async (searchQuery: Record<string, string>, thunkAPI) => {
    try {
      // console.log('search for orders');
      const ordersPaginated = await CRMApi.orders.get_all(searchQuery);
      const { page, pages, total, limit } = ordersPaginated;
      thunkAPI.dispatch(PaginationActions.setPaginationData({ page, pages, total, limit }));
      return thunkAPI.fulfillWithValue(ordersPaginated.data.map(e => ({
        ...e,
        created_at: (new Date(e.created_at)).toLocaleDateString('en-GB'),
      })));
    } catch (e) {
      const error = errorHandle(e);
      // if (error.status === 401) {
      //   navigateTo('/auth/sign-in');
      // }
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(OrdersActions.setLoadingState(false));
    }
  },
);

const getOrder = createAsyncThunk(
  'orders/getOrder',
  async (order_id: number, thunkAPI) => {
    try {
      // console.log('search for one order');
      const order = await CRMApi.orders.get_one(order_id);
      // thunkAPI.dispatch(PaginationActions.setPaginationData({ page, pages, total, limit }));
      return thunkAPI.fulfillWithValue({
        ...order,
        created_at: (new Date(order.created_at)).toLocaleDateString('en-GB'),
      });
    } catch (e) {
      const error = errorHandle(e);
      // if (error.status === 401) {
      //   navigateTo('/auth/sign-in');
      // }
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(OrdersActions.setLoadingState(false));
    }
  },
);

interface ICommentProps {
  order_id: number;
  comment: IComment;
}

const addComment = createAsyncThunk(
  'orders/addComment',
  async ({ order_id, comment }: ICommentProps, thunkAPI) => {
    try {
      const order = await CRMApi.orders.add_comment(order_id, comment);
      // thunkAPI.dispatch(PaginationActions.setPaginationData({ page, pages, total, limit }));
      return thunkAPI.fulfillWithValue({
        ...order,
        created_at: (new Date(order.created_at)).toLocaleDateString('en-GB'),
      });
    } catch (e) {
      const error = errorHandle(e);
      if (error.status === 401) {
        navigateTo('/auth/sign-in');
      }
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(OrdersActions.setLoadingState(false));
    }
  },
);

interface IProps {
  order_id: number,
  orderEdited: IOrderEdit
}

const editOrder = createAsyncThunk(
  'orders/editOrder',
  async ({ order_id, orderEdited }: IProps, thunkAPI) => {
    try {
      const orderReceived = await CRMApi.orders.edit_one(order_id, { ...orderEdited });
      return thunkAPI.fulfillWithValue({
        ...orderReceived,
        created_at: (new Date(orderReceived.created_at)).toLocaleDateString('en-GB'),
      });
    } catch (e) {
      const error = errorHandle(e);
      // if (error.status === 401) {
      //   navigateTo('/auth/sign-in');
      // }
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
    setChosenOrder: (state, action: PayloadAction<IOrder | null>) => {
      state.chosenOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchForOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map(e => e.id === action.payload.id ? action.payload : e);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.orders = state.orders.map(e => e.id === action.payload.id ? action.payload : e);
      })
      .addCase(editOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map(e => e.id === action.payload.id ? action.payload : e);
      })
      .addMatcher(
        isRejected(searchForOrders, getOrder, addComment, editOrder),
        (state, action) => {
          console.error(
            'Orders receive sequence failed with error:',
            action.payload,
          );
        })
      .addMatcher(
        isPending(searchForOrders, getOrder, addComment, editOrder),
        (state) => {
          state.ordersLoadingState = true;
        },
      );
  },
});

export const OrdersActions = {
  ...ordersSlice.actions, searchForOrders, getOrder, addComment, editOrder,
};