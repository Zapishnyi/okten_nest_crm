import { createAsyncThunk, createSlice, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';
import IUser from '../../interfaces/IUser';
import { CRMApi } from '../../services/crm.api.servise';
import { AxiosError } from 'axios';
import IErrorResponse from '../../interfaces/IErrorResponse';
import { navigateTo } from '../../helpers/navigate-to';

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
      const users = await CRMApi.admin.get_all_users(query);

      return thunkAPI.fulfillWithValue(users.map(e => ({
        ...e,
        created_at: (new Date(e.created_at)).toLocaleDateString('uk-UA'),
        last_login: !!e.last_login ? (new Date(e.last_login))
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
      const error = e as AxiosError<IErrorResponse>;
      if (error.status === 401) {
        navigateTo('/auth/sign-in');
      } else {
        navigateTo('/error');
      }
      return thunkAPI.rejectWithValue(error.response?.data);
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
      .addMatcher(
        isRejected(getAllUsers),
        (state, action) => {
          console.error(
            'Users receive sequence failed with error:',
            action.payload,
          );
        })
      .addMatcher(
        isPending(getAllUsers),
        (state) => {
          state.usersLoadingState = true;
        },
      );
  },
});

export const UsersActions = {
  ...usersSlice.actions, getAllUsers,
};