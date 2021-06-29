import { call, put, all, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { APP_ROUTES } from '@src/constants';
import { callApi } from '@common/utils';

import { actions as loadingActions } from '@features/loading';

import {
  api as tenantApi,
  actions as tenantActions,
  sagas as tenantSagas,
} from '@features/tenant';

import { sagas as userSagas } from '@common/modules/user';

import { exceptionHandlerSaga } from './sagas.errors';

/**
 * Процесс загрузки текста согласия на ЭДО
 *
 * @returns {void}
 */
export function* loadConsentToEdmTextFlow() {
  try {
    // показываем loader
    yield put(loadingActions.startLoading({ isGlobal: true }));

    // загружаем текст согласия на ЭДО
    yield call(tenantSagas.loadConsentToEdmTextSaga);
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  } finally {
    // скрываем loader
    yield put(loadingActions.stopLoading());
  }
}

/**
 * Процесс отправки согласия на ЭДО
 *
 * @returns {void}
 */
export function* sendConsentToEdmFlow() {
  try {
    // показываем loader
    yield put(loadingActions.startLoading());

    // отправляем запрос на согласие на ЭДО
    yield call(callApi, tenantApi.sendConsentToEdm);

    // перезагружаем данные пользователя
    yield call(userSagas.loadUserSaga);

    // удаляем текст согласия на ЭДО из стора
    yield put(tenantActions.setConsentToEdmText(''));

    // редирект на главную
    yield put(push(APP_ROUTES.MAIN_PAGE));
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  } finally {
    // скрываем loader
    yield put(loadingActions.stopLoading());
  }
}

/**
 * Ватчер для пользователя
 *
 * @returns {void}
 */
export function* tenantWatcher() {
  yield all([
    takeEvery(tenantActions.loadConsentToEdmTextFlow, loadConsentToEdmTextFlow),
    takeEvery(tenantActions.sendConsentToEdmFlow, sendConsentToEdmFlow),
  ]);
}
