import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

import { STATUSES } from './constants';

const actionPrefix = getConfig('modules.signature');
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Action для вызова Saga
 */
const sagasActions = {
  sign: createPrefixAction('sign'),
  cancel: createPrefixAction('cancel'),
};

const initialState = {
  status: STATUSES.NONE,
  packageId: null,
  certificates: [],
  selectedCertificate: null,
  errors: [],
  isLoading: false,
};

/* eslint-disable no-param-reassign */
const signatureSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setStatus(state, { payload }) {
      state.status = payload;
    },
    setPackageId(state, { payload }) {
      state.packageId = payload;
    },
    setCertificates(state, { payload }) {
      state.certificates = payload;
    },
    selectCertificate(state, { payload }) {
      state.selectedCertificate = payload;
    },
    addErrors(state, { payload: errors }) {
      state.errors = [...state.errors, ...errors];
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
/* eslint-enable no-param-reassign */

export const signatureReducer = signatureSlice.reducer;

export const actions = {
  ...sagasActions,
  ...signatureSlice.actions,
};
