import { put, take, call, all, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';

import { callApi } from '@common/utils';
import { withPermission, PERMISSIONS } from '@common/modules/user';

import { api } from './api';
import { actions } from './ducks';
import { selectors } from './selectors';

/**
 * Сага для отклонения входящего документа
 *
 * @param {number|string} appealId - Идентификатор входящего документа
 *
 * @returns {void}
 */
export function* rejectIncomingDocumentSaga(appealId) {
  try {
    // открываем модальное окно
    yield put(actions.openRejectModal());

    // ждем экшн на отмену или отклонение
    const action = yield take([
      actions.closeRejectModal,
      actions.sendRejection,
      LOCATION_CHANGE,
    ]);

    if (action.type === actions.sendRejection.toString()) {
      // получаем комментарий
      const { comment } = action.payload;

      // показываем loader
      yield put(actions.startLoading());

      // отклоняем входящий документ
      yield call(callApi, api.rejectIncomingDocument, [appealId, comment]);
    }
  } finally {
    // скрываем loader
    yield put(actions.stopLoading());
    // закрываем модальное окно
    yield put(actions.closeRejectModal());
  }
}

/**
 * Сага для загрузки входящих документов требующих подтверждение получение
 *
 * @returns {void}
 */
export function* loadIncomingDocumentsRequiredConfirmationSaga() {
  // получаем входящие документы требующие подтверждение получение
  const { appeals: incomingDocuments = [] } = yield call(
    callApi,
    api.getIncomingDocumentRequiredConfirmation,
  );

  // кладем в стор
  yield put(
    actions.setIncomingDocumentsRequiredConfirmation(
      incomingDocuments.map(
        ({ id, title, created, updated, lastAttachments }) => ({
          id,
          title,
          created,
          updated,
          lastAttachments,
        }),
      ),
    ),
  );
}

/**
 * Сага для подтверждения получения входящих документов
 *
 * @returns {void}
 */
export function* confirmReceiptIncomingDocumentsSaga() {
  // получаем список входящих документов
  const incomingDocumentsRequiredConfirmation = yield select(
    selectors.incomingDocumentsRequiredConfirmation,
  );

  // отправляем подтверждение получения для входящих документов
  yield all(
    incomingDocumentsRequiredConfirmation.map(({ id }) =>
      call(callApi, api.confirmReceiptIncomingDocument, [id]),
    ),
  );
}

export const sagas = {
  rejectIncomingDocumentSaga: withPermission({
    permission: PERMISSIONS.incomingDocument.sign,
    saga: rejectIncomingDocumentSaga,
  }),
  loadIncomingDocumentsRequiredConfirmationSaga: withPermission({
    permission: PERMISSIONS.incomingDocument.confirmReceipt,
    saga: loadIncomingDocumentsRequiredConfirmationSaga,
  }),
  confirmReceiptIncomingDocumentsSaga: withPermission({
    permission: PERMISSIONS.incomingDocument.confirmReceipt,
    saga: confirmReceiptIncomingDocumentsSaga,
  }),
};
