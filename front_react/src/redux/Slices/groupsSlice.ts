import { createAsyncThunk, createSlice, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';

import { errorHandle } from '../../helpers/error-handle';
import { IGroupCreate } from '../../interfaces/IGroupCreate';
import { CRMApi } from '../../services/crm.api.servise';

interface IInitial {
  groups: string[];
  groupsLoadingState: boolean,
}

const initialState: IInitial = {
  groups: [],
  groupsLoadingState: false,
};

const getGroups = createAsyncThunk(
  'groups/getGroups',
  async (_, thunkAPI) => {
    try {
      const groups = await CRMApi.groups.get_all();
      return thunkAPI.fulfillWithValue(groups.map(e => e.name));
    } catch (e) {
      const error = errorHandle(e);
      // if (error.status === 401) {
      //   navigateTo('/auth/sign-in');
      // }
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(GroupsActions.setLoadingState(false));
    }
  },
);

const addGroup = createAsyncThunk(
  'groups/addGroup',
  async (groupName: IGroupCreate, thunkAPI) => {
    try {
      const group = await CRMApi.groups.create_group(groupName);
      return thunkAPI.fulfillWithValue(group.name);
    } catch (e) {
      const error = errorHandle(e);
      // if (error.status === 401) {
      //   navigateTo('/auth/sign-in');
      // }
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(GroupsActions.setLoadingState(false));
    }
  },
);

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.groupsLoadingState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addGroup.fulfilled, (state, action) => {
        const current = [...state.groups];
        current.push(action.payload);
        state.groups = current;
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.groups = action.payload;
      })
      .addMatcher(
        isRejected(addGroup, getGroups),
        (state, action) => {
          console.error(
            'Group receive sequence failed with error:',
            action.payload,
          );
        })
      .addMatcher(
        isPending(addGroup, getGroups),
        (state) => {
          state.groupsLoadingState = true;
        },
      );
  },
});

export const GroupsActions = {
  ...groupsSlice.actions, getGroups, addGroup,
};