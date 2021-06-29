import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = `${getConfig('modules.situations')}/contractMissed`;
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
};

const initialState = {
  appeal: {
    id: null,
    landlord: null,
    contractNumber: '',
    contractDate: '',
    address: '',
    cadastralNumber: '',
    comment: '',
  },
};

/* eslint-disable no-param-reassign */
const situationContractMissedSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    addAppeal(state, { payload: appealId }) {
      state.appeal.id = appealId;
    },
    setAppealField: {
      reducer(state, { payload: { field, value } }) {
        state.appeal[field] = value;
      },
      prepare(field, value) {
        return { payload: { field, value } };
      },
    },
    reset: () => initialState,
  },
});
/* eslint-enable no-param-reassign */

export const situationContractMissedReducer =
  situationContractMissedSlice.reducer;

export const actions = {
  ...situationContractMissedSlice.actions,
  ...sagasActions,
};
