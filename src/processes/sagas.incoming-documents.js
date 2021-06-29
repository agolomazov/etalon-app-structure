import { call, put, all, takeEvery } from 'redux-saga/effects';

import {
  actions as incomingDocumentsActions,
  sagas as incomingDocumentsSagas,
} from '@features/incoming-documents';

import { sagas as widgetsSagas } from '@features/widgets';

import { exceptionHandlerSaga } from './sagas.errors';

/**
 * Процесс отправки подтверждения получения входящих документов
 *
 * @returns {void}
 */
export function* confirmReceiptIncomingDocumentsFlow() {
  try {
    // показываем loader
    yield put(incomingDocumentsActions.startLoading());

    // отправка подтверждения получения входящих документов
    yield call(incomingDocumentsSagas.confirmReceiptIncomingDocumentsSaga);

    // обновляем виджет с входящими документами
    yield call(widgetsSagas.loadIncomingDocumentsWidgetSaga);

    // повторно загружаем входящие документы требующие подтверждения
    yield call(
      incomingDocumentsSagas.loadIncomingDocumentsRequiredConfirmationSaga,
    );
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  } finally {
    // скрываем loader
    yield put(incomingDocumentsActions.stopLoading());
  }
}

/**
 * Вотчер входящих документов
 *
 * @returns {void}
 */
export function* incomingDocumentsWatcher() {
  yield all([
    takeEvery(
      incomingDocumentsActions.confirmReceiptIncomingDocumentsFlow,
      confirmReceiptIncomingDocumentsFlow,
    ),
  ]);
}
