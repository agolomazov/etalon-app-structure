import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = getConfig('modules.tenant');
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Actions для вызова Saga
 */
const sagasActions = {
  sendConsentToEdmFlow: createPrefixAction('sendConsentToEdmFlow'),
  loadConsentToEdmTextFlow: createPrefixAction('loadConsentToEdmTextFlow'),
};

/**
 * Экшн для очистки всего стора
 */
const resetAll = createAction('store/reset');

const initialState = {
  consentToEdmText: '',
};

/* eslint-disable no-param-reassign */
const tenantSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setConsentToEdmText(state, { payload }) {
      state.consentToEdmText = payload;
    },
    reset: () => initialState,
  },
});

export const tenantReducer = tenantSlice.reducer;

export const actions = {
  resetAll,
  ...sagasActions,
  ...tenantSlice.actions,
};
