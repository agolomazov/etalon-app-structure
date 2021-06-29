import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

import { PAYMENT_METHOD_TYPES } from '../../constants';

const actionPrefix = `${getConfig('modules.payment')}/accruals`;
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Actions для вызова Saga
 */
const sagasActions = {
  loadPaymentAccrualsFlow: createPrefixAction('loadPaymentAccrualsFlow'),
  goToPaymentFlow: createPrefixAction('goToPaymentFlow'),
};

const initialState = {
  paymentMethod: PAYMENT_METHOD_TYPES.LK,
  bcc: '',
  accrualsByBcc: {},
  selectedIdsByBcc: {
    [PAYMENT_METHOD_TYPES.LK]: {},
    [PAYMENT_METHOD_TYPES.EPGU]: {},
  },
  isLoading: true,
};

const selectAccrualIfPaymentMethodIsLK = (
  selectedIdsByBcc,
  accrualId,
  isSelected,
) => {
  const selectedIdsByBccCopy = {
    ...(selectedIdsByBcc || {}),
    [accrualId]: isSelected,
  };
  if (!isSelected) {
    delete selectedIdsByBccCopy[accrualId];
  }

  return selectedIdsByBccCopy;
};

const selectAccrualIfPaymentMethodIsEPGU = (accrualId, isSelected) =>
  isSelected ? { [accrualId]: true } : {};

/* eslint-disable no-param-reassign */
const accrualsSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setPaymentMethod(state, { payload: paymentMethod }) {
      state.paymentMethod = paymentMethod;
    },
    setBcc(state, { payload: bcc }) {
      state.bcc = bcc;
    },
    setAccrualsByBcc(state, { payload: accrualsByBcc }) {
      state.accrualsByBcc = accrualsByBcc;
    },
    selectAccrual(state, { payload: { accrualId, isSelected } }) {
      if (state.bcc) {
        state.selectedIdsByBcc[state.paymentMethod][state.bcc] =
          state.paymentMethod === PAYMENT_METHOD_TYPES.LK
            ? selectAccrualIfPaymentMethodIsLK(
                state.selectedIdsByBcc[state.paymentMethod][state.bcc],
                accrualId,
                isSelected,
              )
            : selectAccrualIfPaymentMethodIsEPGU(accrualId, isSelected);
      }
    },
    selectBccAccruals(state, { payload: isSelected }) {
      if (state.bcc) {
        const accrualsByBcc = state.accrualsByBcc[state.bcc] || [];
        state.selectedIdsByBcc[state.paymentMethod][state.bcc] = isSelected
          ? Object.fromEntries(
              accrualsByBcc.map(({ accrualId }) => [accrualId, true]),
            )
          : {};
      }
    },
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    reset: () => initialState,
  },
});
/* eslint-enable no-param-reassign */

export const accrualsReducer = accrualsSlice.reducer;

export const actions = {
  ...accrualsSlice.actions,
  ...sagasActions,
};
