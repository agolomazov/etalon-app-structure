import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = getConfig('modules.accruals');
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Actions для вызова Saga
 */
const sagasActions = {
  loadAccrualsFlow: createPrefixAction('loadAccrualsFlow'),
};

const initialState = {
  accruals: [],
  pagination: {
    pageNumber: 0,
    totalItems: 0,
  },
  queryParams: null,
  isLoading: false,
};

/* eslint-disable no-param-reassign */
const accrualsSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    setAccruals(state, { payload }) {
      state.accruals = payload;
    },
    setQueryParams(state, { payload }) {
      state.queryParams = payload;
    },
    setPagination(state, { payload }) {
      state.pagination = payload;
    },
    clearAccruals: () => initialState,
  },
});
/* eslint-enable no-param-reassign */

export const accrualsReducer = accrualsSlice.reducer;

export const actions = {
  ...sagasActions,
  ...accrualsSlice.actions,
};
