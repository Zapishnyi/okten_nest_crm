import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitial {
  createUserFormVisible: boolean;
  editOrderFormVisible: boolean,
}

const initialState: IInitial = {
  createUserFormVisible: false,
  editOrderFormVisible: false,
};


export const visibilitySlice = createSlice({
  name: 'visibility',
  initialState,
  reducers: {
    createUserFormVisible: (state, action: PayloadAction<boolean>) => {
      state.createUserFormVisible = action.payload;
    },
    editOrderFormVisible: (state, action: PayloadAction<boolean>) => {
      state.createUserFormVisible = action.payload;
    },
  },

});

export const VisibilityActions = {
  ...visibilitySlice.actions,
};