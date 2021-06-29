import { createAction, createSlice } from '@reduxjs/toolkit';

import { getConfig } from '@common/config';

const actionPrefix = getConfig('modules.support');
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

const sendSupportMessageFlow = createPrefixAction('sendSupportMessageFlow');
const downloadUserManualFlow = createPrefixAction('downloadUserManualFlow');

const initialState = {
  isLoading: false,
};

const supportSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    startLoading: () => ({ isLoading: true }),
    stopLoading: () => ({ isLoading: false }),
  },
});

export const supportReducer = supportSlice.reducer;

export const actions = {
  sendSupportMessageFlow,
  downloadUserManualFlow,
  ...supportSlice.actions,
};
