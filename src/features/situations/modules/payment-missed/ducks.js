import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = `${getConfig('modules.situations')}/paymentMissed`;
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
    contractId: null,
    contractNumber: '',
    contractDate: '',
    payer: '',
    paymentOrderNumber: '',
    paymentOrderDate: '',
    paymentAmount: '',
    paymentPeriod: '',
    comment: '',
  },
};

/* eslint-disable no-param-reassign */
const situationPaymentMissedSlice = createSlice({
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

export const situationPaymentMissedReducer =
  situationPaymentMissedSlice.reducer;

export const actions = {
  ...situationPaymentMissedSlice.actions,
  ...sagasActions,
};
