import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = getConfig('modules.paymentHistory');
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Actions для вызова Saga
 */
const sagasActions = {
  loadPaymentHistoryFlow: createPrefixAction('loadPaymentHistoryFlow'),
};

const initialState = {
  payments: [],
  pagination: {
    pageNumber: 0,
    totalItems: 0,
  },
  queryParams: null,
  isLoading: false,
};

/* eslint-disable no-param-reassign */
const paymentHistorySlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    setPayments(state, { payload }) {
      state.payments = payload;
    },
    setQueryParams(state, { payload }) {
      state.queryParams = payload;
    },
    setPagination(state, { payload }) {
      state.pagination = payload;
    },
    clearPayments: () => initialState,
  },
});
/* eslint-enable no-param-reassign */

export const paymentHistoryReducer = paymentHistorySlice.reducer;

export const actions = {
  ...sagasActions,
  ...paymentHistorySlice.actions,
};
