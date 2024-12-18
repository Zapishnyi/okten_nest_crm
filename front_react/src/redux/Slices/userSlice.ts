import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUser from '../../interfaces/IUser';

interface IInitial {
  user: IUser | null;
}

const initialState: IInitial = {
  user: null,
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
  },
});

export const UserActions = {
  ...userSlice.actions,
};