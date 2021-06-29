import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = getConfig('modules.incomingDocuments');
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Actions для вызова Saga
 */
const sagasActions = {
  sendRejection: createPrefixAction('sendRejection'),
  confirmReceiptIncomingDocumentsFlow: createPrefixAction(
    'confirmReceiptIncomingDocumentsFlow',
  ),
};

const initialState = {
  isRejectModalOpen: false,
  incomingDocumentsRequiredConfirmation: [],
  isLoading: false,
};

/* eslint-disable no-param-reassign */
const incomingDocumentsSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    openRejectModal(state) {
      state.isRejectModalOpen = true;
    },
    closeRejectModal(state) {
      state.isRejectModalOpen = false;
    },
    setIncomingDocumentsRequiredConfirmation(state, { payload }) {
      state.incomingDocumentsRequiredConfirmation = payload;
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

export const incomingDocumentsReducer = incomingDocumentsSlice.reducer;

export const actions = {
  ...incomingDocumentsSlice.actions,
  ...sagasActions,
};
