import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = getConfig('modules.contracts');
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Action для вызова Saga
 */
const loadContractsFlow = createPrefixAction('loadContractsFlow');

const initialState = {
  contracts: [],
  pagination: {
    pageNumber: 0,
    totalItems: 0,
  },
  queryParams: null,
  isLoading: false,
};

/**
 * Сброс состояния до начального
 *
 * @returns {object} Новое значение состояния
 */
const toClearContracts = () => initialState;

/* eslint-disable no-param-reassign */
const contractsSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setContracts(state, { payload }) {
      state.contracts = payload;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    setQueryParams(state, { payload }) {
      state.queryParams = payload;
    },
    setPagination(state, { payload }) {
      state.pagination = payload;
    },
    clearContracts: toClearContracts,
  },
});

export const contractsReducer = contractsSlice.reducer;

export const actions = {
  loadContractsFlow,
  ...contractsSlice.actions,
};
