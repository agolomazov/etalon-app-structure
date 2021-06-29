import { createSlice, createAction } from '@reduxjs/toolkit';

import { getConfig } from '@common/config';

import { APPEAL_TYPES } from './constants';

const actionPrefix = `${getConfig('modules.situations')}/complaint`;
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Actions для вызова Saga
 */
const sagasActions = {
  afterCreateLifeSituationFlow: createPrefixAction(
    'afterCreateLifeSituationFlow',
  ),
  beforeExitLifeSituationFlow: createPrefixAction(
    'beforeExitLifeSituationFlow',
  ),
  chooseAppealTypeFlow: createPrefixAction('chooseAppealTypeFlow'),
};

const initialState = {
  appealType: null,
  appeals: {
    [APPEAL_TYPES.DOCUMENT]: {
      id: null,
    },
    [APPEAL_TYPES.ACTION]: {
      id: null,
    },
  },
  fields: {
    rosimOffice: null,
    documentNumber: '',
    documentDate: '',
    complaintReason: '',
    userDemand: '',
  },
};

/* eslint-disable no-param-reassign */
const situationComplaintSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setAppealType(state, { payload }) {
      state.appealType = payload;
    },
    addAppeal(state, { payload }) {
      if (state.appealType) {
        state.appeals[state.appealType].id = payload;
      }
    },
    setAppealField: {
      reducer(state, { payload: { field, value } }) {
        state.fields[field] = value;
      },
      prepare(field, value) {
        return { payload: { field, value } };
      },
    },
    reset: () => initialState,
  },
});
/* eslint-enable no-param-reassign */

export const situationComplaintReducer = situationComplaintSlice.reducer;

export const actions = {
  ...situationComplaintSlice.actions,
  ...sagasActions,
};
