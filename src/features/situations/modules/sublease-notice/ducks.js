import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = `${getConfig('modules.situations')}/subleaseNotice`;
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
    contract: null,
    subtenant: '',
    subtenantInn: '',
    subtenantContractNumber: '',
    subtenantContractDate: '',
    subtenantDatePeriod: ['', ''],
    comment: '',
  },
};

/* eslint-disable no-param-reassign */
const situationSubleaseNoticeSlice = createSlice({
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

export const situationSubleaseNoticeReducer =
  situationSubleaseNoticeSlice.reducer;

export const actions = {
  ...situationSubleaseNoticeSlice.actions,
  ...sagasActions,
};
