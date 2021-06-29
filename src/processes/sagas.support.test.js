import { testSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';

import { callApi, openFile } from '@common/utils';

import { APP_ROUTES } from '@src/constants';

import { actions as noticesActions } from '@features/notices';
import {
  sagas as supportSagas,
  api as supportApi,
  actions as supportActions,
} from '@features/support';

import { exceptionHandlerSaga } from './sagas.errors';
import {
  sendSupportMessageFlow,
  downloadUserManualFlow,
} from './sagas.support';

const error = new Error('Error');

describe('sendSupportMessageFlow - Отправить сообщение в тех. поддержку', () => {
  test('процесс выполняется успешно', () => {
    const messageType = 'messageType';
    const messageBody = {
      param1: 'param1',
      param2: 'param2',
    };
    const notificationText = 'notificationText';

    testSaga(sendSupportMessageFlow, {
      payload: { messageType, messageBody, notificationText },
    })
      .next()
      .call(supportSagas.sendSupportMessageSaga, messageType, messageBody)
      .next()
      .put(
        noticesActions.showNotice({
          text: notificationText,
        }),
      )
      .next()
      .put(push(APP_ROUTES.MAIN_PAGE))
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    const payload = {};

    testSaga(sendSupportMessageFlow, { payload })
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .isDone();
  });
});

describe('downloadUserManualFlow - Скачивание Руководства пользователя', () => {
  test('процесс выполняется успешно', () => {
    const file = 'file';

    testSaga(downloadUserManualFlow)
      .next()
      .put(supportActions.startLoading())
      .next()
      .call(callApi, supportApi.getUserManual)
      .next(file)
      .put(supportActions.stopLoading())
      .next()
      .call(openFile, file)
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(downloadUserManualFlow)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .isDone();
  });
});
