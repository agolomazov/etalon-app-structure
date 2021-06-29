import { createSlice, createAction } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = `${getConfig('modules.payment')}/ups`;
const createPrefixAction = (type, prepareAction) =>
  createAction(`${actionPrefix}/${type}`, prepareAction);

/**
 * Actions для вызова Saga
 */
const sagasActions = {
  upsViewUnmountFlow: createPrefixAction('upsViewUnmountFlow'),
  goToUpsPrevStepFlow: createPrefixAction('goToUpsPrevStepFlow'),
  goToUpsNextStepFlow: createPrefixAction('goToUpsNextStepFlow'),
  goToAcquireFlow: createPrefixAction('goToAcquireFlow'),
};

const initialState = {
  pageTitle: '',
  order: null,
  stepsCount: 0,
  fieldValues: {},
  isLoading: false,
};

/* eslint-disable no-param-reassign */
const upsSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setPageTitle(state, { payload: pageTitle }) {
      state.pageTitle = pageTitle;
    },
    setOrder(state, { payload: order }) {
      state.order = order;
    },
    setOrderStep(state, { payload: orderStep }) {
      if (state.order?.step) {
        state.order.step = orderStep;
      }
    },
    setStepsCount(state, { payload: stepsCount }) {
      state.stepsCount = stepsCount;
    },
    setAmount(state, { payload: amount }) {
      if (state.order?.step) {
        state.order.summa = amount;
      }
    },
    setFieldValue(state, { payload: { name, value } }) {
      state.fieldValues[name] = value;
    },
    removeFieldValuesForCurrentStep(state) {
      const fields = state.order?.services?.serv?.pars?.par ?? [];
      fields.forEach(({ step, name }) => {
        if (step === state.order.step) {
          delete state.fieldValues[name];
        }
      });
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

export const upsReducer = upsSlice.reducer;

export const actions = {
  ...upsSlice.actions,
  ...sagasActions,
};
