import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = getConfig('modules.contractDetails');
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Action для вызова Saga
 */
const loadContractDetailsFlow = createPrefixAction('loadContractDetailsFlow');
const loadContractReceiptFlow = createPrefixAction('loadContractReceiptFlow');
const loadContract1cFlow = createPrefixAction('loadContract1cFlow');

const initialState = {
  contractDetails: null,
  isLoading: false,
};

/**
 * Сброс состояния до начального
 * @returns {object} initinalState
 */
const toClearContractDetails = () => initialState;

/* eslint-disable no-param-reassign */
const contractDetailsSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setContractDetails(state, { payload }) {
      state.contractDetails = payload;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    clearContractDetails: toClearContractDetails,
  },
});

export const contractDetailsReducer = contractDetailsSlice.reducer;

export const actions = {
  loadContractDetailsFlow,
  loadContractReceiptFlow,
  loadContract1cFlow,
  ...contractDetailsSlice.actions,
};
