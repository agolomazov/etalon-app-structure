import { call, put, all, select, takeEvery } from 'redux-saga/effects';

import { LOGOUT_URL } from '@src/constants';

import { actions as loadingActions } from '@features/loading';
import { sagas as incomingDocumentsSagas } from '@features/incoming-documents';
import {
  selectors as appSettingsSelectors,
  sagas as appSettingsSagas,
} from '@features/app-settings';
import {
  selectors as dictionariesSelectors,
  sagas as dictionariesSagas,
} from '@features/dictionaries';
import {
  actions as userActions,
  selectors as userSelectors,
  sagas as userSagas,
} from '@common/modules/user';

import { exceptionHandlerSaga } from './sagas.errors';

/**
 * Процесс выхода пользователя из ЛК
 *
 * @returns {void}
 */
export function* logoutUserFlow() {
  try {
    // показываем loader
    yield put(loadingActions.startLoading({ isGlobal: true }));

    // полностью очищаем стор
    yield put(userActions.resetAll());

    // редирект на страницу логаута
    yield call([window.location, window.location.replace], LOGOUT_URL);
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  } finally {
    // скрываем loader
    yield put(loadingActions.stopLoading());
  }
}

/**
 * Процесс провеки авторизован ли пользователь
 *
 * @returns {void}
 */
export function* checkUserFlow() {
  try {
    // устанавливаем Pending-статус проверки пользователя
    const isUserCheckStatusNone = yield select(
      userSelectors.isUserCheckStatusNone,
    );
    if (isUserCheckStatusNone) {
      yield put(userActions.setUserCheckStatusPending());
    }

    // загружаем данные пользователя
    const user = yield select(userSelectors.userData);
    if (!user) {
      yield call(userSagas.loadUserSaga);
    }

    // проверяем получено ли согласие на ЭДО
    yield call(userSagas.checkUserConsentToEdmSaga);

    // загружаем входящие документы требующие подтверждения получения
    yield call(
      incomingDocumentsSagas.loadIncomingDocumentsRequiredConfirmationSaga,
    );

    // загружаем параметры приложения
    const isAppSettingsLoaded = yield select(
      appSettingsSelectors.isAppSettingsLoaded,
    );
    if (!isAppSettingsLoaded) {
      yield call(appSettingsSagas.loadAppSettingsSaga);
    }

    // загружаем справочники
    const isDictionariesEmpty = yield select(
      dictionariesSelectors.isDictionariesEmpty,
    );
    if (isDictionariesEmpty) {
      yield call(dictionariesSagas.loadDictionariesSaga);
    }
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  } finally {
    // устанавливаем Done-статус проверки пользователя
    yield put(userActions.setUserCheckStatusDone());
  }
}

export const userLogoutProcess = {
  action: userActions.logoutUserFlow,
  process: logoutUserFlow,
};

/**
 * Ватчер для пользователя
 *
 * @returns {void}
 */
export function* userWatcher() {
  yield all([takeEvery(userActions.checkUserFlow, checkUserFlow)]);
}
