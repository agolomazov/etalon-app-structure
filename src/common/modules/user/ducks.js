import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

import { USER_CHECK_STATUS } from './constants';

const actionPrefix = getConfig('modules.user');
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Actions для вызова Saga
 */
const sagasActions = {
  logoutUserFlow: createPrefixAction('logoutUserFlow'),
  checkUserFlow: createPrefixAction('checkUserFlow'),
};

/**
 * Экшн для очистки всего стора
 */
const resetAll = createAction('store/reset');

const initialState = {
  userData: null,
  userCheckStatus: USER_CHECK_STATUS.NONE,
};

/* eslint-disable no-param-reassign */
const userSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.userData = payload;
    },
    setUserCheckStatusDone(state) {
      state.userCheckStatus = USER_CHECK_STATUS.DONE;
    },
    setUserCheckStatusPending(state) {
      state.userCheckStatus = USER_CHECK_STATUS.PENDING;
    },
    reset: () => initialState,
  },
});

export const userReducer = userSlice.reducer;

export const actions = {
  resetAll,
  ...sagasActions,
  ...userSlice.actions,
};
