import { testSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';

import { callApi, convertFileToBase64 } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';
import { sagas } from './sagas';
import { selectors } from './selectors';
import { setSortMessagesList, fixUrl } from './utils';
import { APPEAL_TYPES } from './constants';

describe('loadAppealsSaga - сага загружает список обращений и кладет его в стор', () => {
  test('Должно отработать запрос к API и положить данные в стор', async () => {
    const appeals = [1, 2, 3];
    testSaga(sagas.loadAppealsSaga)
      .next()
      .call(callApi, api.getAppeals, [], ['data', 'appeals'])
      .next(appeals)
      .put(actions.setAppeals(appeals))
      .next()
      .isDone();
  });
});

describe('loadContractAppealsSaga - сага загружает список обращений по договору и кладет его в стор', () => {
  test('Должно отработать запрос к API и положить данные в стор', async () => {
    const contractAppeals = [1, 2, 3];
    const contractId = '1';
    testSaga(sagas.loadContractAppealsSaga, contractId)
      .next()
      .call(
        callApi,
        api.getAppealsByContract,
        [contractId],
        ['data', 'appeals'],
      )
      .next(contractAppeals)
      .call(setSortMessagesList, contractAppeals)
      .next(contractAppeals)
      .put(actions.setContractAppeals(contractAppeals));
  });
});

describe('loadAppealCommentsSaga - сага загружает список комментариев и кладет его в стор', () => {
  test('Должно отработать запрос к API и положить данные в стор', async () => {
    const comments = [1, 2, 3];
    const id = '1';
    testSaga(sagas.loadAppealCommentsSaga)
      .next()
      .select(selectors.currentAppealId)
      .next(id)
      .call(callApi, api.getAppealComments, [id], ['data', 'comments'])
      .next(comments)
      .put(actions.setAppealComments(comments))
      .next()
      .isDone();
  });
});

describe('loadAppealSaga - сага загружает детали обращения', () => {
  test('Должно отработать запрос к API и положить данные в стор, вызвать загрузку комментариев', async () => {
    const appeals = [
      {
        type: 'CHANGE_JURIDICAL_ADDRESS',
        href: 'href',
        id: 1,
      },
    ];
    testSaga(sagas.loadAppealSaga, 1)
      .next()
      .select(selectors.appealsList)
      .next(appeals)
      .call(callApi, api.getAppeal, [fixUrl(appeals[0].href)])
      .next(appeals[0])
      .put(actions.setAppeal(appeals[0]))
      .next()
      .call(sagas.loadAppealCommentsSaga)
      .next()
      .isDone();
  });

  test('Должно отработать запрос к API и положить данные в стор', async () => {
    const appeals = [
      {
        type: APPEAL_TYPES.INCOMING_DOCUMENT_SIGNATURE_REQUIRED,
        href: 'href',
        id: 1,
      },
    ];
    testSaga(sagas.loadAppealSaga, 1)
      .next()
      .select(selectors.appealsList)
      .next(appeals)
      .call(callApi, api.getAppeal, [fixUrl(appeals[0].href)])
      .next(appeals[0])
      .put(actions.setAppeal(appeals[0]))
      .next()
      .isDone();
  });
});

describe('sendMessageSaga - отправляет комментарий или оценку', () => {
  const feedback = { rate: '5' };
  const statusFinal = 'Итоговый ответ';
  const statusRequested = 'Запрошена дополнительная информация';
  const comment = {
    body: 'text',
    appealId: '1',
    attachments: [],
  };

  test('процесс выполняется успешно, фидбэк', () => {
    testSaga(sagas.sendMessageSaga)
      .next()
      .select(selectors.feedback)
      .next(feedback)
      .select(selectors.comment)
      .next(null)
      .select(selectors.currentAppealStatus)
      .next(statusFinal)
      .call(callApi, api.setAppealFeedback, [feedback], ['data'])
      .next()
      .isDone();
  });

  test('процесс выполняется успешно, коммент', () => {
    testSaga(sagas.sendMessageSaga)
      .next()
      .select(selectors.feedback)
      .next(null)
      .select(selectors.comment)
      .next(comment)
      .select(selectors.currentAppealStatus)
      .next(statusRequested)
      .call(callApi, api.setAppealComment, [comment], ['data'])
      .next()
      .isDone();
  });

  test('процесс выполняется успешно, коммент c вложениями', () => {
    const commentWithAttachments = {
      body: 'text',
      appealId: '1',
      attachments: [
        {
          path: '1',
        },
        {
          path: '2',
        },
      ],
    };
    const newComment = {
      body: 'text',
      appealId: '1',
      attachments: [
        {
          fileName: '1',
          file: '1',
        },
        {
          fileName: '2',
          file: '2',
        },
      ],
    };
    testSaga(sagas.sendMessageSaga)
      .next()
      .select(selectors.feedback)
      .next(null)
      .select(selectors.comment)
      .next(commentWithAttachments)
      .select(selectors.currentAppealStatus)
      .next(statusRequested)
      .all([
        call(convertFileToBase64, commentWithAttachments.attachments[0]),
        call(convertFileToBase64, commentWithAttachments.attachments[1]),
      ])
      .next(['1', '2'])
      .call(callApi, api.setAppealComment, [newComment], ['data'])
      .next()
      .isDone();
  });
});

describe('updateAppealSaga - Обновление обращения и списка обращений', () => {
  test('процесс выполняется успешно', () => {
    const href = 'href';
    testSaga(sagas.updateAppealSaga)
      .next()
      .select(selectors.currentAppealHref)
      .next(href)
      .call(sagas.loadAppealsSaga)
      .next()
      .call(sagas.loadAppealSaga, href)
      .next()
      .isDone();
  });
});
