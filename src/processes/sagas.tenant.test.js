import { testSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';

import { loadConsentToEdmTextFlow, sendConsentToEdmFlow } from './sagas.tenant';

import { exceptionHandlerSaga } from './sagas.errors';

import { APP_ROUTES } from '@src/constants';
import { callApi } from '@common/utils';

import { actions as loadingActions } from '@features/loading';

import {
  api as tenantApi,
  actions as tenantActions,
  sagas as tenantSagas,
} from '@features/tenant';

import { sagas as userSagas } from '@common/modules/user';

const error = new Error('Error');

describe('loadConsentToEdmTextFlow - Процесс загрузки текста согласия на ЭДО', () => {
  test('процесс выполняется успешно', () => {
    testSaga(loadConsentToEdmTextFlow)
      .next()
      .put(loadingActions.startLoading({ isGlobal: true }))
      .next()
      .call(tenantSagas.loadConsentToEdmTextSaga)
      .next()
      .put(loadingActions.stopLoading())
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(loadConsentToEdmTextFlow)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .put(loadingActions.stopLoading())
      .next()
      .isDone();
  });
});

describe('sendConsentToEdmFlow - Процесс отправки согласия на ЭДО', () => {
  test('процесс выполняется успешно', () => {
    testSaga(sendConsentToEdmFlow)
      .next()
      .put(loadingActions.startLoading())
      .next()
      .call(callApi, tenantApi.sendConsentToEdm)
      .next()
      .call(userSagas.loadUserSaga)
      .next()
      .put(tenantActions.setConsentToEdmText(''))
      .next()
      .put(push(APP_ROUTES.MAIN_PAGE))
      .next()
      .put(loadingActions.stopLoading())
      .next().isDone;
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(sendConsentToEdmFlow)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .put(loadingActions.stopLoading())
      .next()
      .isDone();
  });
});
