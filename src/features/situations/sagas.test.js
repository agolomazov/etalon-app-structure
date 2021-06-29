import { testSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';

import { callApi, downloadFile, addDateToFileName } from '@common/utils';

import { sagas as attachmentsSagas } from './modules/attachments';

import { api } from './api';
import { actions } from './ducks';
import { selectors } from './selectors';
import { sagas } from './sagas';
import { FILE_NAME_MAP } from './constants';

const lifeSituationType = 'reconciliation-act';
const lifeSituationId = '1';
const appealType = 'offset-to-different-contract';
const appealId = '1';

describe('createAppealSaga - сага создает обращение', () => {
  test('Сага отрабатывает запрос к API и возвращает Id обращения', () => {
    testSaga(sagas.createAppealSaga, appealType)
      .next()
      .select(selectors.lifeSituationType)
      .next(lifeSituationType)
      .select(selectors.lifeSituationId)
      .next(lifeSituationId)
      .call(
        callApi,
        api.createAppeal,
        [lifeSituationType, lifeSituationId, appealType],
        ['data', 'id'],
      )
      .next(appealId)
      .isDone();
  });
});

describe('deleteAppealSaga - сага удаляет обращение', () => {
  test('Сага отрабатывает запрос к API на удаление обращения', () => {
    testSaga(sagas.deleteAppealSaga, appealId)
      .next()
      .select(selectors.lifeSituationId)
      .next(lifeSituationId)
      .call(callApi, api.deleteAppeal, [lifeSituationId, appealId])
      .next()
      .isDone();
  });
});

describe('saveAppealSaga - сага сохраняет обращение', () => {
  test('Сага отрабатывает запрос к API на сохранение обращения и возвращает ответ от серевера', () => {
    const appeal = { appealId, appeaText: 'appeal text' };
    const appealSelector = () => appeal;
    const appealMapper = () => appeal;
    const files = [
      [
        {
          fileId: '1',
          linkId: '1',
        },
        {
          fileId: '2',
        },
      ],
    ];

    testSaga(sagas.saveAppealSaga, {
      appealIds: [appealId],
      appealType,
      appealSelector,
      appealMapper,
    })
      .next()
      .put(actions.startLoading())
      .next()
      .select(selectors.lifeSituationType)
      .next(lifeSituationType)
      .select(selectors.lifeSituationId)
      .next(lifeSituationId)
      .select(appealSelector)
      .next(appeal)
      .all([call(attachmentsSagas.getFilesByAppealIdSaga, appealId)])
      .next(files)
      .call(callApi, api.saveAppeal, [
        lifeSituationType,
        lifeSituationId,
        appealType,
        appeal,
      ])
      .next({})
      .put(actions.stopLoading())
      .next()
      .isDone();
  });
});

describe('downloadFormSaga - сага скачивает печатную форму', () => {
  test('Сага отрабатывает запрос к API на сохранение обращения и возвращает ответ от серевера', () => {
    const formType = 'scanned-appeal';
    const form = { formText: 'form text' };
    const formBlob = 'form blob';
    const formSelector = () => form;
    const formMapper = () => form;

    testSaga(sagas.downloadFormSaga, {
      appealType,
      appealId,
      formType,
      formSelector,
      formMapper,
    })
      .next()
      .put(actions.startDownloadFormLoading())
      .next()
      .select(selectors.lifeSituationType)
      .next(lifeSituationType)
      .select(selectors.lifeSituationId)
      .next(lifeSituationId)
      .select(formSelector)
      .next(form)
      .call(callApi, api.downloadForm, [
        {
          lifeSituationType,
          lifeSituationId,
          appealType,
          appealId,
          formType,
          formData: form,
        },
      ])
      .next(formBlob)
      .call(
        downloadFile,
        formBlob,
        addDateToFileName(
          FILE_NAME_MAP[appealType].fileName,
          FILE_NAME_MAP[appealType].fileExtension,
        ),
      )
      .next()
      .put(actions.stopDownloadFormLoading())
      .next()
      .isDone();
  });
});

describe('createAppealSagaFactory - фабричный метод, создает сагу для создания обращения', () => {
  test('фабричный метод должен возвращать сагу', () => {
    const saga = sagas.createAppealSagaFactory()();
    expect(typeof saga.next).toBe('function');
  });

  test('сага должна показывать/скрывать loader, если передан экшен startLoading и stopLoading', () => {
    const startLoading = () => ({
      type: 'startLoading',
    });
    const stopLoading = () => ({
      type: 'stopLoading',
    });
    const saga = sagas.createAppealSagaFactory(appealType, {
      startLoading,
      stopLoading,
    });
    testSaga(saga, appealId)
      .next()
      .put(startLoading())
      .next()
      .call(sagas.createAppealSaga, appealType)
      .next()
      .put(stopLoading());
  });

  test('сага должна вызвать сагу createAppealSaga и положить Id обращения в стор', () => {
    const addAppeal = (id) => ({ type: 'addAppeal', appealId: id });
    const saga = sagas.createAppealSagaFactory(appealType, { addAppeal });
    testSaga(saga)
      .next()
      .call(sagas.createAppealSaga, appealType)
      .next(appealId)
      .put(addAppeal(appealId))
      .next()
      .isDone();
  });
});

describe('deleteAppealSagaFactory - фабричный метод, создает сагу для удаления обращения', () => {
  test('фабричный метод должен возвращать сагу', () => {
    const saga = sagas.deleteAppealSagaFactory()();
    expect(typeof saga.next).toBe('function');
  });

  test('сага должна показывать/скрывать loader, если передан экшен startLoading и stopLoading', () => {
    const startLoading = () => ({
      type: 'startLoading',
    });
    const stopLoading = () => ({
      type: 'stopLoading',
    });
    const saga = sagas.deleteAppealSagaFactory({ startLoading, stopLoading });
    testSaga(saga, appealId)
      .next()
      .put(startLoading())
      .next()
      .call(sagas.deleteAppealSaga, appealId)
      .next()
      .put(stopLoading());
  });

  test('сага должна вызвать сагу deleteAppealSaga и вызвать экшен на удаление обращения из стора', () => {
    const deleteAppeal = (id) => ({ type: 'deleteAppeal', appealId: id });
    const saga = sagas.deleteAppealSagaFactory({ deleteAppeal });
    testSaga(saga, appealId)
      .next()
      .call(sagas.deleteAppealSaga, appealId)
      .next()
      .put(deleteAppeal(appealId))
      .next()
      .isDone();
  });
});
