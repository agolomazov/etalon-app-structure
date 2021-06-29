import { testSaga } from 'redux-saga-test-plan';
import { LOCATION_CHANGE } from 'connected-react-router';
import { call } from 'redux-saga/effects';

import { callApi } from '@common/utils';

import {
  rejectIncomingDocumentSaga,
  confirmReceiptIncomingDocumentsSaga,
  loadIncomingDocumentsRequiredConfirmationSaga,
} from './sagas';

import { api } from './api';
import { actions } from './ducks';
import { selectors } from './selectors';

describe('rejectIncomingDocumentSaga - Процесс отклонения документа', () => {
  test('процесс выполняется успешно', () => {
    const id = '1';
    const action = {
      type: actions.sendRejection.toString(),
      payload: { comment: 'test comment' },
    };
    testSaga(rejectIncomingDocumentSaga, id)
      .next()
      .put(actions.openRejectModal())
      .next()
      .take([actions.closeRejectModal, actions.sendRejection, LOCATION_CHANGE])

      .save('before condition')
      .next(action)
      .put(actions.startLoading())
      .next()
      .call(callApi, api.rejectIncomingDocument, [id, action.payload.comment])
      .next()
      .put(actions.stopLoading())
      .next()
      .put(actions.closeRejectModal())
      .next()
      .isDone()

      .restore('before condition')
      .next({ type: 'any' })
      .put(actions.stopLoading())
      .next()
      .put(actions.closeRejectModal())
      .next()
      .isDone();
  });
});

describe('loadIncomingDocumentsRequiredConfirmationSaga - Процесс загрузки входящих документов требующих подтверждение получение', () => {
  test('процесс выполняется успешно', () => {
    const incomingDocuments = [
      {
        id: 1,
        title: 'title',
        created: 'date',
        updated: 'date',
        lastAttachments: [],
      },
    ];
    const result = { appeals: incomingDocuments };

    testSaga(loadIncomingDocumentsRequiredConfirmationSaga)
      .next()
      .call(callApi, api.getIncomingDocumentRequiredConfirmation)
      .next(result)
      .put(
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
      )
      .next()
      .isDone();
  });
});

describe('confirmReceiptIncomingDocumentsSaga - Процесс подтверждения получения входящих документов', () => {
  test('процесс выполняется успешно', () => {
    const documents = [{ id: 1 }];
    testSaga(confirmReceiptIncomingDocumentsSaga)
      .next()
      .select(selectors.incomingDocumentsRequiredConfirmation)
      .next(documents)
      .all(
        documents.map(({ id }) =>
          call(callApi, api.confirmReceiptIncomingDocument, [id]),
        ),
      )
      .next()
      .isDone();
  });
});
