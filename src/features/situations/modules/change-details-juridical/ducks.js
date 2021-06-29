import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';
import { APPEAL_TYPES } from './constants';

const actionPrefix = `${getConfig('modules.situations')}/detailsJuridical`;
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
    [APPEAL_TYPES.address]: {
      id: null,
      comment: '',
    },
    [APPEAL_TYPES.inn]: {
      id: null,
      comment: '',
    },
    [APPEAL_TYPES.name]: {
      id: null,
      comment: '',
    },
    [APPEAL_TYPES.contacts]: {
      id: null,
      tel: '',
      email: '',
      comment: '',
    },
    [APPEAL_TYPES.leader]: {
      id: null,
      surname: '',
      name: '',
      patronymic: '',
      comment: '',
    },
  },
};

/* eslint-disable no-param-reassign */
const situationChangeDetailsJuridicalSlice = createSlice({
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

export const situationChangeDetailsJuridicalReducer =
  situationChangeDetailsJuridicalSlice.reducer;

export const actions = {
  ...situationChangeDetailsJuridicalSlice.actions,
  ...sagasActions,
};
