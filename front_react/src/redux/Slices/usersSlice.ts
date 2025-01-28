import { createAsyncThunk, createSlice, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';

import { errorHandle } from '../../helpers/error-handle';
import IUser from '../../interfaces/IUser';
import { CRMApi } from '../../services/crm.api.service';

interface IInitial {
  userLogged: IUser | null;
  users: IUser[],
  usersLoadingState: boolean,
}

const initialState: IInitial = {
  userLogged: null,
  users: [],
  usersLoadingState: false,
};
const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (query: Record<string, string>, thunkAPI) => {
    try {
      // console.log('search for users', query);
      const users = await CRMApi.admin.get_all_users(query);

      return thunkAPI.fulfillWithValue(users.map(e => ({
        ...e,
        created_at: (new Date(e.created_at)).toLocaleDateString('uk-UA'),
        last_login: e.last_login ? (new Date(e.last_login))
            .toLocaleString('uk-UA', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Europe/Kyiv',
            })
          : 'null',
      })));
    } catch (e) {
      const error = errorHandle(e);
      // if (error.status === 401) {
      //   navigateTo('/auth/sign-in');
      // }
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(UsersActions.setLoadingState(false));
    }
  },
);


const banReinstate = createAsyncThunk(
  'users/banReinstate',
  async (user_id: number, thunkAPI) => {
    try {
      // console.log('search for users');
      const user = await CRMApi.admin.ban_reinstate_user(user_id);

      return thunkAPI.fulfillWithValue({
        ...user,
        created_at: (new Date(user.created_at)).toLocaleDateString('uk-UA'),
        last_login: user.last_login ? (new Date(user.last_login))
            .toLocaleString('uk-UA', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Europe/Kyiv',
            })
          : 'null',
      });
    } catch (e) {
      const error = errorHandle(e);
      // if (error.status === 401) {
      //   navigateTo('/auth/sign-in');
      // }
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(UsersActions.setLoadingState(false));
    }
  },
);


export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.userLogged = action.payload;
    },
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.usersLoadingState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(banReinstate.fulfilled, (state, action) => {
        state.users = state.users.map(user => user.id === action.payload.id ? action.payload : user);
      })
      .addMatcher(
        isRejected(getAllUsers, banReinstate),
        (state, action) => {
          console.error(
            'Users receive sequence failed with error:',
            action.payload,
          );
        })
      .addMatcher(
        isPending(getAllUsers, banReinstate),
        (state) => {
          state.usersLoadingState = true;
        },
      );
  },
});

export const UsersActions = {
  ...usersSlice.actions, getAllUsers, banReinstate,
};