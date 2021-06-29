import { testSaga } from 'redux-saga-test-plan';
import { takeEvery } from 'redux-saga/effects';
import { callApi } from '@common/utils';
import { selectors as navigationSelectors } from '@features/navigation';

import { exceptionHandlerSaga } from './sagas.errors';
import {
  loadAppealFlow,
  loadAppealsFlow,
  sendMessageFlow,
  signAndSendMessageFlow,
  appealsWatcher,
  rejectIncomingDocumentFlow,
} from './sagas.messages';
import { api, actions, selectors, sagas } from '@features/messages';

import { sagas as incomingDocumentsSagas } from '@features/incoming-documents';
import { sagas as signatureSagas } from '@features/signature';

const error = new Error('Error');

describe('loadAppealsFlow -Загрузка списка обращений', () => {
  const appeals = [1, 2, 3];

  test('процесс выполняется успешно', () => {
    testSaga(loadAppealsFlow)
      .next()
      .put(actions.startAppealsListLoading())
      .next()
      .call(sagas.loadAppealsSaga)
      .next(appeals)
      .put(actions.stopAppealsListLoading())
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(loadAppealsFlow)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .put(actions.stopAppealsListLoading())
      .next()
      .isDone();
  });
});

describe('loadAppealFlow - Загрузка деталей обращения', () => {
  const id = 1;
  test('процесс выполняется успешно, есть новый комментарий', () => {
    testSaga(loadAppealFlow, { payload: id })
      .next()
      .put(actions.startAppealLoading())
      .next()
      .select(navigationSelectors.pathName)
      .next()
      .call(sagas.loadAppealSaga, id)
      .next()
      .put(actions.stopAppealLoading())
      .next()
      .select(selectors.isCurrentAppealRead)
      .save('read condition')

      .next(false)
      .delay(3000)
      .next()
      .select(navigationSelectors.pathName)
      .save('path condition')

      .next()
      .select(selectors.currentAppealId)
      .next('1')
      .call(callApi, api.setAppealCommentRead, ['1'])
      .next()
      .call(sagas.loadAppealsSaga)
      .next()
      .isDone()

      .restore('path condition')
      .next(false)
      .isDone()

      .restore('read condition')
      .next(true)
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(loadAppealFlow, {})
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .isDone();
  });
});

describe('sendMessageFlow - Отправка сообщения', () => {
  test('процесс выполняется успешно', () => {
    testSaga(sendMessageFlow)
      .next()
      .put(actions.startAppealsListLoading())
      .next()
      .call(sagas.sendMessageSaga)
      .next()
      .call(sagas.updateAppealSaga)
      .next()
      .put(actions.stopAppealsListLoading())
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(sendMessageFlow)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .put(actions.stopAppealsListLoading())
      .next()
      .isDone();
  });
});

describe('signAndSendMessageFlow - подписание и отправка документа', () => {
  const currentAppeal = {
    additionalData: {
      attachments: [{ file: { id: 1 } }],
    },
  };
  test('процесс выполняется успешно', () => {
    const ids = [1];
    testSaga(signAndSendMessageFlow)
      .next()
      .select(selectors.currentAppeal)
      .save('check ids')

      .next(currentAppeal)
      .call(signatureSagas.signDocumentsSaga, ids)
      .save('check success')

      .next(true)
      .put(actions.startAppealsListLoading())
      .next()
      .call(sagas.updateAppealSaga)
      .next()
      .put(actions.stopAppealsListLoading())
      .next()
      .isDone()

      .restore('check success')
      .next(false)
      .isDone()

      .restore('check ids')
      .next(false)
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(signAndSendMessageFlow)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .isDone();
  });
});

describe('rejectIncomingDocumentFlow - Отклонение документа', () => {
  test('процесс выполняется успешно, отклонение документа', () => {
    const id = '1';
    testSaga(rejectIncomingDocumentFlow)
      .next()
      .put(actions.startAppealsListLoading())
      .next()
      .select(selectors.currentAppealId)
      .next(id)
      .call(incomingDocumentsSagas.rejectIncomingDocumentSaga, id)
      .next()
      .call(sagas.updateAppealSaga)
      .next()
      .put(actions.stopAppealsListLoading())
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(rejectIncomingDocumentFlow)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .put(actions.stopAppealsListLoading())
      .next()
      .isDone();
  });
});

describe('appealsWatcher - вотчеры сообщений', () => {
  test('процесс выполняется успешно', () => {
    testSaga(appealsWatcher)
      .next()
      .all([
        takeEvery(actions.loadAppealsFlow, loadAppealsFlow),
        takeEvery(actions.loadAppealFlow, loadAppealFlow),
        takeEvery(actions.sendMessageFlow, sendMessageFlow),
        takeEvery(actions.signAndSendMessageFlow, signAndSendMessageFlow),
        takeEvery(
          actions.rejectIncomingDocumentFlow,
          rejectIncomingDocumentFlow,
        ),
      ])
      .next()
      .isDone();
  });
});
