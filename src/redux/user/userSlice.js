import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { register, login, logout, getUserInfo } from 'redux/operations';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const userInitialState = {
  email: '',
  token: '',
  isLogin: false,
  isLoading: null,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const STATUS = {
  FULFILLED: 'fulfilled',
  PENDING: 'pending',
  REJECTED: 'rejected',
};

const actionGenerators = [register, login, logout, getUserInfo];

const getActionGeneratorsWithType = status =>
  actionGenerators.map(generator => generator[status]);

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.isLogin = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.isLogin = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.token = '';
        state.email = '';
        state.isLogin = false;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.isLogin = true;
      })
      .addMatcher(
        isAnyOf(...getActionGeneratorsWithType(STATUS.PENDING)),
        handlePending
      )
      .addMatcher(
        isAnyOf(...getActionGeneratorsWithType(STATUS.FULFILLED)),
        handleFulfilled
      )
      .addMatcher(
        isAnyOf(...getActionGeneratorsWithType(STATUS.REJECTED)),
        handleRejected
      );
  },
});

const persistConfig = {
  key: 'user',
  storage,
  wightlist: ['token'],
};

export const userReducer = persistReducer(persistConfig, userSlice.reducer);
