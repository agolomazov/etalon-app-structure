import { createSlice, createAction } from '@reduxjs/toolkit';

import { getConfig } from '@common/config';
import { setDateFormat, createNumericGenerator } from '@common/utils';

import { APPEAL_TYPES } from './constants';

const actionPrefix = `${getConfig('modules.situations')}/overpayment`;
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

const genPaymentOrderId = createNumericGenerator();

const initialState = {
  appealType: null,
  contract: null,
  amount: '',
  reason: null,
  paymentOrders: {},
  appeals: {
    [APPEAL_TYPES.TRANSFER]: {
      id: null,
      paymentOrdersIds: [],
      contractObligationType: null,
      transferContractId: null,
      transferContractNumber: '',
      transferContractDate: '',
      transferObligationType: null,
      transferPeriod: '',
    },
    [APPEAL_TYPES.REFUND]: {
      id: null,
      paymentOrdersIds: [],
      recipientType: null,
      personFio: '',
      personInn: '',
      passportSeries: '',
      passportNumber: '',
      passportFmsUnit: '',
      passportDate: '',
      companyName: '',
      companyInn: '',
      companyKpp: '',
      bank: '',
      bik: '',
      bankAccount: '',
      correspondentAccount: '',
      personalAccount: '',
      kbk: '',
    },
  },
};

/* eslint-disable no-param-reassign */
const situationOverpaymentSlice = createSlice({
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

    setAmount(state, { payload }) {
      state.amount = payload;
    },

    setReason(state, { payload }) {
      state.reason = payload;
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

    setAppealTransferContract(
      state,
      { payload: { contractNumber, contract } },
    ) {
      const appeal = state.appeals[APPEAL_TYPES.TRANSFER];
      appeal.transferContractNumber = contractNumber;

      const { id, date } = contract || {};
      appeal.transferContractId = id || null;
      if (date) {
        appeal.transferContractDate = setDateFormat(date);
      }
    },

    addPaymentOrder(state) {
      if (!state.appealType) {
        return;
      }
      const paymentOrderId = genPaymentOrderId().toString();
      const { paymentOrdersIds } = state.appeals[state.appealType];
      paymentOrdersIds.push(paymentOrderId);

      state.paymentOrders[paymentOrderId] = {
        paymentOrderId,
        paymentOrderNumber: '',
        paymentOrderDate: '',
      };
    },

    deletePaymentOrder(state, { payload: paymentOrderId }) {
      if (!state.appealType) {
        return;
      }
      const { paymentOrdersIds } = state.appeals[state.appealType];
      const paymentIdIndex = paymentOrdersIds.findIndex(
        (id) => id === paymentOrderId,
      );
      if (paymentIdIndex !== -1) {
        paymentOrdersIds.splice(paymentIdIndex, 1);
        delete state.paymentOrders[paymentOrderId];
      }
    },

    setPaymentOrderField: {
      reducer(state, { payload: { paymentOrderId, field, value } }) {
        const paymentOrder = state.paymentOrders[paymentOrderId];
        if (paymentOrder) {
          paymentOrder[field] = value;
        }
      },
      prepare(paymentOrderId, field, value) {
        return { payload: { paymentOrderId, field, value } };
      },
    },

    reset: () => initialState,
  },
});
/* eslint-enable no-param-reassign */

export const situationOverpaymentReducer = situationOverpaymentSlice.reducer;

export const actions = {
  ...situationOverpaymentSlice.actions,
  ...sagasActions,
};
