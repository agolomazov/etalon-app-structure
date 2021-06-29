import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = getConfig('modules.rentals');
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Action для вызова Saga
 */
const loadRentalsFlow = createPrefixAction('loadRentalsFlow');

const initialState = {
  rentals: [],
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
const toClearRentals = () => initialState;

/* eslint-disable no-param-reassign */
const rentalsSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    setRentals(state, { payload }) {
      state.rentals = payload;
    },
    setQueryParams(state, { payload }) {
      state.queryParams = payload;
    },
    setPagination(state, { payload }) {
      state.pagination = payload;
    },
    clearRentals: toClearRentals,
  },
});

export const rentalsReducer = rentalsSlice.reducer;

export const actions = {
  loadRentalsFlow,
  ...rentalsSlice.actions,
};
