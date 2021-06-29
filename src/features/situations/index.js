import { combineReducers } from 'redux';

import { lifeSituationReducer, actions as situationsActions } from './ducks';
import { selectors as situationsSelectors } from './selectors';
import { sagas as situationsSagas } from './sagas';

import {
  actions as attachmentsAction,
  selectors as attachmentsSelectors,
  sagas as attachmentsSagas,
  situationAttachmentsReducer,
} from './modules/attachments';

import {
  actions as reconcilAction,
  selectors as reconcilSelectors,
  sagas as reconcilSagas,
  situationReconciliationActReducer,
} from './modules/reconciliation-act';

import {
  actions as contractMissedActions,
  selectors as contractMissedSelectors,
  sagas as contractMissedSagas,
  situationContractMissedReducer,
} from './modules/contract-missed';

import {
  actions as paymentMissedActions,
  selectors as paymentMissedSelectors,
  sagas as paymentMissedSagas,
  situationPaymentMissedReducer,
} from './modules/payment-missed';

import {
  actions as detailsJuridicalActions,
  selectors as detailsJuridicalSelectors,
  sagas as detailsJuridicalSagas,
  situationChangeDetailsJuridicalReducer,
} from './modules/change-details-juridical';

import {
  actions as subleaseActions,
  selectors as subleaseSelectors,
  sagas as subleaseSagas,
  situationSubleaseNoticeReducer,
} from './modules/sublease-notice';

import {
  actions as noSuitableActions,
  selectors as noSuitableSelectors,
  sagas as noSuitableSagas,
  situationNoSuitableReducer,
} from './modules/no-suitable';

import {
  actions as complaintActions,
  selectors as complaintSelectors,
  sagas as complaintSagas,
  situationComplaintReducer,
} from './modules/complaint';

import {
  actions as overpaymentActions,
  selectors as overpaymentSelectors,
  sagas as overpaymentSagas,
  situationOverpaymentReducer,
} from './modules/overpayment';

import {
  actions as changeObjectInfoActions,
  selectors as changeObjectInfoSelectors,
  sagas as changeObjectInfoSagas,
  situationChangeObjectInfoReducer,
} from './modules/change-object-info';

import {
  actions as paperCarrierActions,
  selectors as paperCarrierSelectors,
  sagas as paperCarrierSagas,
  situationPaperCarrierReducer,
} from './modules/paper-carrier';

export { api } from './api';
export { Situations } from './components';
export { getSituationsList } from './utils';
export { SITUATIONS_GRID_ITEMS } from './constants';

export { ReconciliationAct } from './modules/reconciliation-act';
export { ContractMissed } from './modules/contract-missed';
export { PaymentMissed } from './modules/payment-missed';
export { ChangeDetailsJuridical } from './modules/change-details-juridical';
export { SubleaseNotice } from './modules/sublease-notice';
export { NoSuitable } from './modules/no-suitable';
export { Complaint } from './modules/complaint';
export { Overpayment } from './modules/overpayment';
export { ChangeObjectInfo } from './modules/change-object-info';
export { PaperCarrier } from './modules/paper-carrier';

export const situationsReducer = combineReducers({
  lifeSituation: lifeSituationReducer,
  attachments: situationAttachmentsReducer,
  reconciliationAct: situationReconciliationActReducer,
  contractMissed: situationContractMissedReducer,
  paymentMissed: situationPaymentMissedReducer,
  detailsJuridical: situationChangeDetailsJuridicalReducer,
  sublease: situationSubleaseNoticeReducer,
  noSuitable: situationNoSuitableReducer,
  complaint: situationComplaintReducer,
  overpayment: situationOverpaymentReducer,
  changeObjectInfo: situationChangeObjectInfoReducer,
  paperCarrier: situationPaperCarrierReducer,
});

export const actions = {
  ...situationsActions,
  attachments: attachmentsAction,
  reconciliationAct: reconcilAction,
  contractMissed: contractMissedActions,
  paymentMissed: paymentMissedActions,
  detailsJuridical: detailsJuridicalActions,
  sublease: subleaseActions,
  noSuitable: noSuitableActions,
  complaint: complaintActions,
  overpayment: overpaymentActions,
  changeObjectInfo: changeObjectInfoActions,
  paperCarrier: paperCarrierActions,
};

export const selectors = {
  ...situationsSelectors,
  attachments: attachmentsSelectors,
  reconciliationAct: reconcilSelectors,
  contractMissed: contractMissedSelectors,
  paymentMissed: paymentMissedSelectors,
  detailsJuridical: detailsJuridicalSelectors,
  sublease: subleaseSelectors,
  noSuitable: noSuitableSelectors,
  complaint: complaintSelectors,
  overpayment: overpaymentSelectors,
  changeObjectInfo: changeObjectInfoSelectors,
  paperCarrier: paperCarrierSelectors,
};

export const sagas = {
  ...situationsSagas,
  attachments: attachmentsSagas,
  reconciliationAct: reconcilSagas,
  contractMissed: contractMissedSagas,
  paymentMissed: paymentMissedSagas,
  detailsJuridical: detailsJuridicalSagas,
  sublease: subleaseSagas,
  noSuitable: noSuitableSagas,
  complaint: complaintSagas,
  overpayment: overpaymentSagas,
  changeObjectInfo: changeObjectInfoSagas,
  paperCarrier: paperCarrierSagas,
};
