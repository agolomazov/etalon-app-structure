import { combineReducers } from 'redux';

import {
  actions as accrualsActions,
  selectors as accrualsSelectors,
  accrualsReducer,
} from './modules/accruals';

import {
  actions as upsActions,
  selectors as upsSelectors,
  upsReducer,
} from './modules/ups';

export { sagas } from './sagas';
export { AccrualsView } from './modules/accruals';
export { UpsView, UpsPageTitle } from './modules/ups';

export const paymentReducer = combineReducers({
  accruals: accrualsReducer,
  ups: upsReducer,
});

export const actions = {
  accruals: accrualsActions,
  ups: upsActions,
};

export const selectors = {
  accruals: accrualsSelectors,
  ups: upsSelectors,
};
