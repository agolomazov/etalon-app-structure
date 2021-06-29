import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

import { APPEAL_TYPES } from './constants';

const actionPrefix = `${getConfig('modules.situations')}/changeObjectInfo`;
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
  situationOnContractChangeFlow: createPrefixAction(
    'situationOnContractChangeFlow',
  ),
  chooseAppealTypeFlow: createPrefixAction('chooseAppealTypeFlow'),
};

const initialState = {
  appealType: null,
  contract: {},
  missingData: {},
  appeals: {
    [APPEAL_TYPES.CHANGE_INFO]: {
      id: null,
      objectAdress: '',
      cadastralNumber: '',
      objectType: '',
      changeAdressValue: null,
      changeAreaValue: '',
      changePermisionType: '',
      changeCategoryValue: '',
      changeObjectIntendValue: '',
      changeCommentValue: '',
      changeCadastralValue: '',
      rentalObjects: [],
    },
    [APPEAL_TYPES.MISSING_DATA]: {
      id: null,
      changeCommentValue: '',
    },
  },
};

/* eslint-disable no-param-reassign */
const situationChangeObjectInfoSlice = createSlice({
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

    setContract(state, { payload }) {
      state.contract = payload;
    },

    setMissingData(state, { payload }) {
      state.missingData = payload;
    },

    setAppealField: {
      reducer(state, { payload: { field, value } }) {
        if (state.appealType) {
          state.appeals[state.appealType][field] = value;
        }
      },
      prepare(field, value) {
        return { payload: { field, value } };
      },
    },

    reset: () => initialState,
  },
});
/* eslint-enable no-param-reassign */

export const situationChangeObjectInfoReducer =
  situationChangeObjectInfoSlice.reducer;

export const actions = {
  ...situationChangeObjectInfoSlice.actions,
  ...sagasActions,
};
