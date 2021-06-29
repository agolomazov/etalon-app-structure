import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = getConfig('modules.widgets');
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Action для вызова Saga
 */
const loadWidgetsFlow = createPrefixAction('loadWidgetsFlow');

const initialState = {
  paymentWidgetData: null,
  itemsCountWidgetData: null,
  incomingDocumentsWidgetData: [],
  isLoading: false,
};

/* eslint-disable no-param-reassign */
const widgetsSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setPaymentWidgetData(state, { payload }) {
      state.paymentWidgetData = payload;
    },
    setItemsCountWidgetData(state, { payload }) {
      state.itemsCountWidgetData = payload;
    },
    setIncomingDocumentsWidgetData(state, { payload }) {
      state.incomingDocumentsWidgetData = payload;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    reset: () => initialState,
  },
});

export const widgetsReducer = widgetsSlice.reducer;

export const actions = {
  loadWidgetsFlow,
  ...widgetsSlice.actions,
};
