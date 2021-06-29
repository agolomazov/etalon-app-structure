import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';
import { APPEAL_TYPES } from './constants';

const actionPrefix = `${getConfig('modules.situations')}/paperCarrier`;
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Actions для вызова Saga
 */
const sagasActions = {
  beforeExitLifeSituationFlow: createPrefixAction(
    'beforeExitLifeSituationFlow',
  ),
  chooseAppealTypeFlow: createPrefixAction('chooseAppealTypeFlow'),
};

const initialState = {
  appealType: null,
  appeals: {
    [APPEAL_TYPES.consent]: {
      id: null,
    },
    [APPEAL_TYPES.refusal]: {
      id: null,
    },
  },
};

/* eslint-disable no-param-reassign */
const situationPaperCarrierSlice = createSlice({
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
    reset: () => initialState,
  },
});
/* eslint-enable no-param-reassign */

export const situationPaperCarrierReducer = situationPaperCarrierSlice.reducer;

export const actions = {
  ...situationPaperCarrierSlice.actions,
  ...sagasActions,
};
