import { combineReducers } from 'redux';
import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = getConfig('modules.calendar');
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Action для вызова Saga
 */
const sagasActions = {
  loadPaymentCalendarFlow: createPrefixAction('loadPaymentCalendarFlow'),
  loadPaymentCalendarDayDetailsFlow: createPrefixAction(
    'loadPaymentCalendarDayDetailsFlow',
  ),
};

const initialState = {};

/* eslint-disable no-param-reassign */
const calendarSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setCalendarPayments: (_, { payload }) => payload,
    reset: () => initialState,
  },
});

const contractsSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    addContracts: (state, { payload: contracts }) => ({
      ...state,
      ...contracts,
    }),
    reset: () => initialState,
  },
});
/* eslint-enable no-param-reassign */

export const calendarReducer = combineReducers({
  contracts: contractsSlice.reducer,
  dates: calendarSlice.reducer,
});

export const actions = {
  ...sagasActions,
  ...calendarSlice.actions,
  ...contractsSlice.actions,
};
