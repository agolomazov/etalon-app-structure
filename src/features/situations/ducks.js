import { createSlice, createAction } from '@reduxjs/toolkit';

import { getConfig } from '@common/config';

const actionPrefix = getConfig('modules.situations');
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Actions для вызова Saga
 */
const sagasActions = {
  createLifeSituationFlow: createPrefixAction('createLifeSituationFlow'),
  completeCreateLifeSituationFlow: createPrefixAction(
    'completeCreateLifeSituationFlow',
  ),
  exitLifeSituationFlow: createPrefixAction('exitLifeSituationFlow'),
  submitLifeSituationFlow: createPrefixAction('submitLifeSituationFlow'),
  downloadFormFlow: createPrefixAction('downloadFormFlow'),
};

const initialState = {
  lifeSituationType: null,
  lifeSituationId: null,
  isLoading: true,
  isDownloadFormLoading: false,
};

/* eslint-disable no-param-reassign */
const lifeSituationSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setLifeSituationType(state, { payload }) {
      state.lifeSituationType = payload;
    },
    setLifeSituationId(state, { payload }) {
      state.lifeSituationId = payload;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    startDownloadFormLoading(state) {
      state.isDownloadFormLoading = true;
    },
    stopDownloadFormLoading(state) {
      state.isDownloadFormLoading = false;
    },
    reset: () => initialState,
  },
});
/* eslint-enable no-param-reassign */

export const lifeSituationReducer = lifeSituationSlice.reducer;

export const actions = {
  ...sagasActions,
  ...lifeSituationSlice.actions,
};
