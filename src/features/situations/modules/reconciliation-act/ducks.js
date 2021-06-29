import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';
import { APPEAL_TYPES } from './constants';

const actionPrefix = `${getConfig('modules.situations')}/reconciliationAct`;
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
  createAppealFlow: createPrefixAction('createAppealFlow'),
  deleteAppealFlow: createPrefixAction('deleteAppealFlow'),
};

const initialState = {
  appealType: null,
  appeals: {
    [APPEAL_TYPES.scanned]: [],
    [APPEAL_TYPES.requested]: [],
  },
  isCreateAppealLoading: false,
};

const findAppeal = (state, appealId) => {
  if (!state.appealType) {
    return null;
  }
  const appeals = state.appeals[state.appealType];
  return appeals.find((app) => app.id === appealId);
};

/* eslint-disable no-param-reassign */
const situationReconciliationActSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setAppealType(state, { payload }) {
      state.appealType = payload;
    },
    addAppeal(state, { payload }) {
      if (!state.appealType) {
        return;
      }
      const appeals = state.appeals[state.appealType];
      appeals.push({
        id: payload,
        contractId: null,
        contractNumber: '',
        contractDate: '',
        datePeriod: ['', ''],
        file: null,
        isLoading: false,
        isFileLoading: false,
      });
    },
    deleteAppeal(state, { payload }) {
      if (!state.appealType) {
        return;
      }
      const appeals = state.appeals[state.appealType];
      const appealIndex = appeals.findIndex((app) => app.id === payload);
      if (appealIndex !== -1) {
        appeals.splice(appealIndex, 1);
      }
    },
    setAppealField: {
      reducer(state, { payload: { appealId, field, value } }) {
        const appeal = findAppeal(state, appealId);
        if (appeal) {
          appeal[field] = value;
        }
      },
      prepare(appealId, field, value) {
        return { payload: { appealId, field, value } };
      },
    },
    startCreateAppealLoading(state) {
      state.isCreateAppealLoading = true;
    },
    stopCreateAppealLoading(state) {
      state.isCreateAppealLoading = false;
    },
    startDeleteAppealLoading(state, { payload: { appealId } }) {
      const appeal = findAppeal(state, appealId);
      if (appeal) {
        appeal.isLoading = true;
      }
    },
    stopDeleteAppealLoading(state, { payload: { appealId } }) {
      const appeal = findAppeal(state, appealId);
      if (appeal) {
        appeal.isLoading = false;
      }
    },
    reset: () => initialState,
  },
});
/* eslint-enable no-param-reassign */

export const situationReconciliationActReducer =
  situationReconciliationActSlice.reducer;

export const actions = {
  ...situationReconciliationActSlice.actions,
  ...sagasActions,
};
