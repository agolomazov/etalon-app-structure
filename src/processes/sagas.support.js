import { call, all, takeEvery, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { callApi, openFile } from '@common/utils';
import { APP_ROUTES } from '@src/constants';

import { actions as noticesActions } from '@features/notices';
import {
  actions as supportActions,
  sagas as supportSagas,
  api,
} from '@features/support';

import { exceptionHandlerSaga } from './sagas.errors';

/**
 * Отправить сообщение в тех. поддержку
 *
 * @param {object} action - экшн
 * @param {object} action.payload - пайлоад
 * @param {string} action.payload.messageType - Тип сообщения
 * @param {object} action.payload.messageBody - Содержимое сообщения
 * @param {string} action.payload.notificationText - Текст уведомления
 *
 * @returns {void}
 */
export function* sendSupportMessageFlow({
  payload: { messageType, messageBody, notificationText },
}) {
  try {
    // отправляем сообщение в тех. поддержку
    yield call(supportSagas.sendSupportMessageSaga, messageType, messageBody);

    // показываем уведомление
    yield put(
      noticesActions.showNotice({
        text: notificationText,
      }),
    );

    // редирект на главную
    yield put(push(APP_ROUTES.MAIN_PAGE));
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Скачивание руководства пользователя
 * @returns {void}
 */
export function* downloadUserManualFlow() {
  try {
    yield put(supportActions.startLoading());
    // отправляем запрос на бекенд, получаем файл
    const data = yield call(callApi, api.getUserManual);
    yield put(supportActions.stopLoading());
    // скачиваем сформированый файл
    yield call(openFile, data);
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Вотчер тех. поддержки
 *
 * @returns {void}
 */
export function* supportWatcher() {
  yield all([
    takeEvery(supportActions.sendSupportMessageFlow, sendSupportMessageFlow),
    takeEvery(supportActions.downloadUserManualFlow, downloadUserManualFlow),
  ]);
}
