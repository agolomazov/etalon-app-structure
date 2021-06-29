import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = getConfig('modules.appeals');
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Action для вызова Saga
 */
const loadAppealsFlow = createPrefixAction('loadAppealsFlow');
const loadAppealFlow = createPrefixAction('loadAppealFlow');
const sendMessageFlow = createPrefixAction('sendMessageFlow');
const signAndSendMessageFlow = createPrefixAction('signAndSendMessageFlow');
const rejectIncomingDocumentFlow = createPrefixAction(
  'rejectIncomingDocumentFlow',
);

const initialState = {
  appealsList: [],
  currentAppeal: null,
  contractAppeals: [],
  comments: [],
  feedback: null,
  comment: null,
  isAppealLoading: false,
  isAppealsListLoading: false,
};

/**
 * Сброс состояния до начального
 *
 * @returns {object} Новое значение состояния
 */
const toClearAppeals = () => initialState;

/* eslint-disable no-param-reassign */
const appealsSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setAppeal(state, { payload }) {
      state.currentAppeal = payload;
    },
    setFeedback(state, { payload }) {
      state.feedback = payload;
    },
    setContractAppeals(state, { payload }) {
      state.contractAppeals = payload;
    },
    setComment(state, { payload }) {
      state.comment = payload;
    },
    setAppealComments(state, { payload }) {
      state.comments = payload;
    },
    setAppeals(state, { payload }) {
      state.appealsList = payload;
    },
    startAppealLoading(state) {
      state.isAppealLoading = true;
    },
    stopAppealLoading(state) {
      state.isAppealLoading = false;
    },
    startAppealsListLoading(state) {
      state.isAppealsListLoading = true;
    },
    stopAppealsListLoading(state) {
      state.isAppealsListLoading = false;
    },
    clearCurrentAppeal(state) {
      state.currentAppeal = null;
    },
    clearAppeals: toClearAppeals,
  },
});
/* eslint-enable no-param-reassign */

export const appealsReducer = appealsSlice.reducer;

export const actions = {
  loadAppealsFlow,
  loadAppealFlow,
  sendMessageFlow,
  signAndSendMessageFlow,
  rejectIncomingDocumentFlow,
  ...appealsSlice.actions,
};
