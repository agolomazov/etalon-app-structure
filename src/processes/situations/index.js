import { all, fork } from 'redux-saga/effects';

import { baseLifeSituationWatcher } from './sagas.base-life-situation';
import { situationReconciliationActWatcher } from './sagas.reconciliation-act';
import { situationContractMissedWatcher } from './sagas.contract-missed';
import { situationPaymentMissedWatcher } from './sagas.payment-missed';
// eslint-disable-next-line max-len
import { situationChangeDetailsJuridicalWatcher } from './sagas.change-details-juridical';
import { situationSubleaseNoticeWatcher } from './sagas.sublease-notice';
import { situationNoSuitableWatcher } from './sagas.no-suitable';
import { situationComplaintWatcher } from './sagas.complaint';
import { situationOverpaymentWatcher } from './sagas.overpayment';
import { situationChangeObjectInfoWatcher } from './sagas.change-object-info';
import { situationPaperCarrierWatcher } from './sagas.paper-carrier';

/**
 * Вотчер для всех ЖС
 *
 * @returns {void}
 */
export function* situationsWatcher() {
  yield all(
    [
      baseLifeSituationWatcher,
      situationReconciliationActWatcher,
      situationContractMissedWatcher,
      situationPaymentMissedWatcher,
      situationChangeDetailsJuridicalWatcher,
      situationSubleaseNoticeWatcher,
      situationNoSuitableWatcher,
      situationComplaintWatcher,
      situationOverpaymentWatcher,
      situationChangeObjectInfoWatcher,
      situationPaperCarrierWatcher,
    ].map(fork),
  );
}
