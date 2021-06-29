import { all, fork, take, cancel } from 'redux-saga/effects';
import {
  rentalsWatcher,
  contractsWatcher,
  userWatcher,
  tenantWatcher,
  userLogoutProcess,
  widgetWatcher,
  calendarWatcher,
  contractDataWatcher,
  paymentHistoryWatcher,
  paymentWatcher,
  accrualsWatcher,
  appealsWatcher,
  supportWatcher,
  incomingDocumentsWatcher,
  situationsWatcher,
} from '@processes';

/**
 * Главная сага - точка входа
 *
 * @returns {void}
 */
export function* rootSaga() {
  while (true) {
    // запускаем процессы
    const processes = yield all(
      [
        rentalsWatcher,
        contractsWatcher,
        userWatcher,
        tenantWatcher,
        widgetWatcher,
        calendarWatcher,
        contractDataWatcher,
        paymentHistoryWatcher,
        paymentWatcher,
        accrualsWatcher,
        appealsWatcher,
        supportWatcher,
        incomingDocumentsWatcher,
        situationsWatcher,
      ].map(fork),
    );

    // ждем экшн на logout
    const action = yield take(userLogoutProcess.action);

    // отменяем процессы
    yield cancel(processes);

    // выполняем logout
    yield fork(userLogoutProcess.process, action);
  }
}
