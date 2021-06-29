import { testSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { logoutUserFlow, checkUserFlow } from './sagas.user';

import { exceptionHandlerSaga } from './sagas.errors';

import { APP_ROUTES, LOGOUT_URL } from '@src/constants';
import { callApi } from '@common/utils';

import { sagas as incomingDocumentsSagas } from '@features/incoming-documents';
import { actions as loadingActions } from '@features/loading';
import {
  selectors as appSettingsSelectors,
  sagas as appSettingsSagas,
} from '@features/app-settings';
import {
  selectors as dictionariesSelectors,
  sagas as dictionariesSagas,
} from '@features/dictionaries';
import {
  api as userApi,
  actions as userActions,
  selectors as userSelectors,
  sagas as userSagas,
} from '@common/modules/user';

const error = new Error('Error');

describe('logoutUserFlow - процесс выхода пользователя из ЛК', () => {
  test('процесс выполняется успешно', () => {
    testSaga(logoutUserFlow)
      .next()
      .put(loadingActions.startLoading({ isGlobal: true }))
      .next()
      .put(userActions.resetAll())
      .next()
      .call([window.location, window.location.replace], LOGOUT_URL)
      .next()
      .put(loadingActions.stopLoading())
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(logoutUserFlow)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .put(loadingActions.stopLoading())
      .next()
      .isDone();
  });
});

describe('checkUserFlow - провеки авторизован ли пользователь', () => {
  const user = { userData: 'Василий Пупкин' };

  test('процесс выполняется успешно', () => {
    testSaga(checkUserFlow)
      .next()

      .select(userSelectors.isUserCheckStatusNone)
      .next(true)
      .put(userActions.setUserCheckStatusPending())
      .back()
      .next(false)

      .select(userSelectors.userData)
      .next(null)
      .call(userSagas.loadUserSaga)
      .back()
      .next(user)

      .call(userSagas.checkUserConsentToEdmSaga)
      .next()
      .call(
        incomingDocumentsSagas.loadIncomingDocumentsRequiredConfirmationSaga,
      )
      .next()

      .select(appSettingsSelectors.isAppSettingsLoaded)
      .next(false)
      .call(appSettingsSagas.loadAppSettingsSaga)
      .back()
      .next(true)

      .select(dictionariesSelectors.isDictionariesEmpty)
      .next(true)
      .call(dictionariesSagas.loadDictionariesSaga)
      .back()
      .next(false)

      .put(userActions.setUserCheckStatusDone())
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(checkUserFlow)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .put(userActions.setUserCheckStatusDone())
      .next()
      .isDone();
  });
});
