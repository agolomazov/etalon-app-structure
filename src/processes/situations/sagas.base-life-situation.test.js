import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';

import { APP_ROUTES } from '@src/constants';
import { getUiMessages } from '@common/messages';
import { callApi } from '@common/utils';

import { actions as noticesActions } from '@features/notices';

import {
  api as situationsApi,
  actions as situationsActions,
  sagas as situationsSagas,
} from '@features/situations';

const { attachments: attachmentsSagas } = situationsSagas;
const { attachments: attachmentsActions } = situationsActions;

import { exceptionHandlerSaga } from '../sagas.errors';
import {
  startCreateLifeSituationFlow,
  completeCreateLifeSituationFlow,
  exitLifeSituationFlow,
  attachAppealFileFlow,
  deleteAppealFileFlow,
  downloadFormFlow,
  submitLifeSituationFlow,
  withErrorHandling,
  withCompleteCreateLifeSituation,
} from './sagas.base-life-situation';

const error = new Error('Error');
const lifeSituationType = 'reconciliation-act';
const lifeSituationId = 1;

describe('startCreateLifeSituationFlow - запускает процесс создания ЖС ', () => {
  test('процесс выполняется успешно', () => {
    const afterCreateLifeSituationAction = () => ({});

    testSaga(startCreateLifeSituationFlow, {
      payload: { lifeSituationType, afterCreateLifeSituationAction },
    })
      .next()
      .put(situationsActions.startLoading())
      .next()
      .call(
        callApi,
        situationsApi.createLifeSituation,
        [lifeSituationType],
        ['data', 'id'],
      )
      .next(lifeSituationId)
      .put(situationsActions.setLifeSituationType(lifeSituationType))
      .next()
      .put(situationsActions.setLifeSituationId(lifeSituationId))
      .next()
      .put(afterCreateLifeSituationAction())
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(startCreateLifeSituationFlow, { payload: { lifeSituationType } })
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next();
  });
});

describe('completeCreateLifeSituationFlow - завершает процесс создания ЖС ', () => {
  test('процесс выполняется успешно', () => {
    testSaga(completeCreateLifeSituationFlow)
      .next()
      .put(situationsActions.stopLoading())
      .next()
      .isDone();
  });
});

describe('exitLifeSituationFlow - процесс выхода из ЖС', () => {
  test('процесс выполняется успешно', () => {
    const beforeExitLifeSituationAction = () => ({});
    testSaga(exitLifeSituationFlow, {
      payload: { beforeExitLifeSituationAction },
    })
      .next()
      .put(beforeExitLifeSituationAction())
      .next()
      .put(attachmentsActions.reset())
      .next()
      .put(situationsActions.reset())
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(exitLifeSituationFlow, { payload: {} })
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next();
  });
});

describe('attachAppealFileFlow - процесс прикрепляет файл к обращению', () => {
  const action = {};

  test('процесс выполняется успешно', () => {
    testSaga(attachAppealFileFlow, action)
      .next()
      .call(attachmentsSagas.attachAppealFileSaga, action)
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(attachAppealFileFlow, action)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next();
  });
});

describe('deleteAppealFileFlow - процесс удаляет ранее прикрепленный файл', () => {
  const action = {};

  test('процесс выполняется успешно', () => {
    testSaga(deleteAppealFileFlow, action)
      .next()
      .call(attachmentsSagas.deleteAppealFileSaga, action)
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(deleteAppealFileFlow, action)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next();
  });
});

describe('downloadFormFlow - процесс скачивает печатную форму', () => {
  const action = { payload: 'payload' };

  test('процесс выполняется успешно', () => {
    testSaga(downloadFormFlow, action)
      .next()
      .call(situationsSagas.downloadFormSaga, action.payload)
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(downloadFormFlow, action)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next();
  });
});

describe('submitLifeSituationFlow - процесс отправляет обращение на сервер', () => {
  const action = { payload: 'payload' };
  const appeals = [
    {
      id: '995368f3-dfc7-45a6-8df7-c49f5ae47293',
      title: 'successfully sent 1',
    },
    {
      id: 'b357f686-9372-4c11-927a-7d5cbd031a30',
      title: 'successfully sent 2',
    },
  ];

  test('процесс выполняется успешно', () => {
    testSaga(submitLifeSituationFlow, action)
      .next()
      .call(situationsSagas.saveAppealSaga, action.payload)
      .next(appeals)
      .all([
        put(
          noticesActions.showNotice({
            text: getUiMessages('notifyAppealSentSuccess')(appeals[0].title),
          }),
        ),
        put(
          noticesActions.showNotice({
            text: getUiMessages('notifyAppealSentSuccess')(appeals[1].title),
          }),
        ),
      ])
      .next()
      .put(push(APP_ROUTES.MESSAGES_APPEAL(appeals[0].id)))
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(submitLifeSituationFlow, action)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next();
  });
});

describe('withErrorHandling - метод оборачивает сагу в try..catch', () => {
  test('метод должен возвращать сагу', () => {
    const saga = withErrorHandling()();
    expect(typeof saga.next).toBe('function');
  });

  test('результирующая сага должна запускать оригинальную сагу', () => {
    function* saga() {}
    const wrappedSaga = withErrorHandling(saga);

    testSaga(wrappedSaga).next().call(saga).next().isDone();
  });

  test('результирующая сага должна корректно обрабатывать исключение', () => {
    function* saga() {}
    const wrappedSaga = withErrorHandling(saga);

    testSaga(wrappedSaga)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .isDone();
  });
});

describe('withCompleteCreateLifeSituation - метод оборачивает сагу в try..catch и добавляет вызов situationsActions.completeCreateLifeSituationFlow', () => {
  test('метод должен возвращать сагу', () => {
    const saga = withCompleteCreateLifeSituation()();
    expect(typeof saga.next).toBe('function');
  });

  test('результирующая сага должна запускать оригинальную сагу и вызывать situationsActions.completeCreateLifeSituationFlow', () => {
    function* saga() {}
    const wrappedSaga = withCompleteCreateLifeSituation(saga);

    testSaga(wrappedSaga)
      .next()
      .call(saga)
      .next()
      .put(situationsActions.completeCreateLifeSituationFlow())
      .next()
      .isDone();
  });

  test('результирующая сага должна корректно обрабатывать исключение', () => {
    function* saga() {}
    const wrappedSaga = withCompleteCreateLifeSituation(saga);

    testSaga(wrappedSaga)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next();
  });
});
