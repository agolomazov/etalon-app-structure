import { testSaga } from 'redux-saga-test-plan';
import { confirmReceiptIncomingDocumentsFlow } from './sagas.incoming-documents';

import {
  actions as incomingDocumentsActions,
  sagas as incomingDocumentsSagas,
} from '@features/incoming-documents';

import { sagas as widgetsSagas } from '@features/widgets';

import { exceptionHandlerSaga } from './sagas.errors';

const error = new Error('Error');

describe('confirmReceiptIncomingDocumentsFlow - Процесс отправки подтверждения получения входящих документов', () => {
  test('процесс выполняется успешно, отклонение документа', () => {
    testSaga(confirmReceiptIncomingDocumentsFlow)
      .next()
      .put(incomingDocumentsActions.startLoading())
      .next()
      .call(incomingDocumentsSagas.confirmReceiptIncomingDocumentsSaga)
      .next()
      .call(widgetsSagas.loadIncomingDocumentsWidgetSaga)
      .next()
      .call(
        incomingDocumentsSagas.loadIncomingDocumentsRequiredConfirmationSaga,
      )
      .next()
      .put(incomingDocumentsActions.stopLoading())
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(confirmReceiptIncomingDocumentsFlow)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .put(incomingDocumentsActions.stopLoading())
      .next()
      .isDone();
  });
});
