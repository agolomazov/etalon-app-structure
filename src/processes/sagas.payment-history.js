import { call, all, takeEvery } from 'redux-saga/effects';

import {
  actions as paymentHistoryActions,
  sagas as paymentHistorySagas,
} from '@features/payment-history';

import { exceptionHandlerSaga } from './sagas.errors';

/**
 * Загрузка истории платежей по договору
 *
 * @param {object} action - экшн
 * @param {object} action.payload - пайлоад
 * @param {string} action.payload.contractId - Id договора
 * @param {object} action.payload.sort - сортировка
 * @param {string} action.payload.sort.field - Поле, по которому проводится сортировка
 * @param {string} action.payload.sort.direction - Направление, по которому проводится сортировка
 * @param {object} action.payload.page - пагинация
 * @param {number} action.payload.page.number - Номер страницы
 * @param {number} action.payload.page.size - Размер страницы
 *
 * @returns {void}
 */
export function* loadPaymentHistoryFlow({ payload: queryParams }) {
  try {
    // загружаем историю платежей
    yield call(paymentHistorySagas.loadPaymentHistorySaga, {
      queryParams,
    });
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Вотчер истории платежей
 *
 * @returns {void}
 */
export function* paymentHistoryWatcher() {
  yield all([
    takeEvery(
      paymentHistoryActions.loadPaymentHistoryFlow,
      loadPaymentHistoryFlow,
    ),
  ]);
}
