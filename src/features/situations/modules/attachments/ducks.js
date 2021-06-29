import { combineReducers } from 'redux';
import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = `${getConfig('modules.situations')}/attachments`;
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Actions для вызова Saga
 */
const sagasActions = {
  attachAppealFileFlow: createPrefixAction('attachAppealFileFlow'),
  deleteAppealFileFlow: createPrefixAction('deleteAppealFileFlow'),
};

const initialState = {};

/* eslint-disable no-param-reassign */
const situationFilesSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    addFile(state, { payload: { appealId, fileInfo, fileToUpload } }) {
      const files = state[appealId] || {};
      files[fileInfo.id] = {
        fileToUpload,
        ...fileInfo,
      };
      state[appealId] = files;
    },
    deleteFile(state, { payload: { appealId, fileId } }) {
      if (state[appealId] && state[appealId][fileId]) {
        delete state[appealId][fileId];
      }
    },
    startLoading(state, { payload: { appealId, fileId } }) {
      if (state[appealId] && state[appealId][fileId]) {
        state[appealId][fileId].isLoading = true;
      }
    },
    stopLoading(state, { payload: { appealId, fileId } }) {
      if (state[appealId] && state[appealId][fileId]) {
        state[appealId][fileId].isLoading = false;
      }
    },
    reset: () => initialState,
  },
});

const situationLinksSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    addLinkToFile(state, { payload: { appealId, fileId, linkId } }) {
      if (linkId) {
        state[linkId] = { appealId, fileId };
      }
    },
    deleteLinkToFile(state, { payload: linkId }) {
      if (state[linkId]) {
        delete state[linkId];
      }
    },
    reset: () => initialState,
  },
});

const situationLoadersSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    startUploading(state, { payload: uniq }) {
      state[uniq] = true;
    },
    stopUploading(state, { payload: uniq }) {
      if (state[uniq]) {
        delete state[uniq];
      }
    },
    reset: () => initialState,
  },
});
/* eslint-enable no-param-reassign */

export const situationAttachmentsReducer = combineReducers({
  files: situationFilesSlice.reducer,
  links: situationLinksSlice.reducer,
  loaders: situationLoadersSlice.reducer,
});

export const actions = {
  ...situationFilesSlice.actions,
  ...situationLinksSlice.actions,
  ...situationLoadersSlice.actions,
  ...sagasActions,
};
