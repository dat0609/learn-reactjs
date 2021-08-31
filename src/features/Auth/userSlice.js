import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import StorageKeys from 'constant/storage-keys';

export const register = createAsyncThunk('user/register', async (payload) => {
  //call API to register
  const data = await userApi.register(payload);

  //save data
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  //return user data
  return data.user;
});

export const login = createAsyncThunk('user/login', async (payload) => {
  //call API to register
  const data = await userApi.login(payload);

  //save data
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  //return user data
  return data.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logout(state, action) {
      //clear localStorage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);

      state.currentUser = {};
    },
  },

  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },

    [login.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

const { reducer } = userSlice;
export const { logout } = userSlice.actions;
export default reducer;
