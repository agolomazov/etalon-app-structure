import { call, all, put, select, takeEvery, delay } from 'redux-saga/effects';

import { callApi } from '@common/utils';

import { selectors as navigationSelectors } from '@features/navigation';

import {
  actions as appealsActions,
  api as appealsApi,
  selectors as appealsSelectors,
  sagas as appealsSagas,
} from '@features/messages';

import { sagas as signatureSagas } from '@features/signature';
import { sagas as incomingDocumentsSagas } from '@features/incoming-documents';

import { exceptionHandlerSaga } from './sagas.errors';

/**
 * Загрузка списка обращений
 *
 * @returns {void}
 */
export function* loadAppealsFlow() {
  try {
    // отправляем запрос на бекенд, получаем список обращений
    yield put(appealsActions.startAppealsListLoading());
    yield call(appealsSagas.loadAppealsSaga);
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  } finally {
    yield put(appealsActions.stopAppealsListLoading());
  }
}

/**
 * Загрузка деталей обращения
 *
 * @param {object} action - action
 * @param {string} action.payload - id обращения
 *
 * @returns {void}
 */
export function* loadAppealFlow({ payload: appealId }) {
  try {
    yield put(appealsActions.startAppealLoading());
    const pathName = yield select(navigationSelectors.pathName);
    // отправляем запрос на бекенд, получаем детали обращения
    yield call(appealsSagas.loadAppealSaga, appealId);
    yield put(appealsActions.stopAppealLoading());

    // ждем 3 секунды и отмечаем сообщение причитанным
    const read = yield select(appealsSelectors.isCurrentAppealRead);
    if (read === false) {
      yield delay(3000);
      const pathNameControl = yield select(navigationSelectors.pathName);
      // eslint-disable-next-line max-depth
      if (pathName === pathNameControl) {
        const id = yield select(appealsSelectors.currentAppealId);
        yield call(callApi, appealsApi.setAppealCommentRead, [id]);
        // обновляем список сообщений
        yield call(appealsSagas.loadAppealsSaga);
      }
    }
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Отправка сообщения или отзыва
 *
 * @returns {void}
 */
export function* sendMessageFlow() {
  try {
    yield put(appealsActions.startAppealsListLoading());
    // отправляем сообщение или оценку
    yield call(appealsSagas.sendMessageSaga);
    // обновляем инфо по обращению
    yield call(appealsSagas.updateAppealSaga);
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  } finally {
    yield put(appealsActions.stopAppealsListLoading());
  }
}

/**
 * Подписать и отправить сообщение
 *
 * @returns {void}
 */
export function* signAndSendMessageFlow() {
  try {
    // получаем текущее обращение
    const currentAppeal = yield select(appealsSelectors.currentAppeal);

    // получаем список входящих документов
    const attachments = currentAppeal?.additionalData?.attachments || [];

    // идентификаторы файлов для подписания
    const ids = attachments
      .map(({ file }) => file?.id || undefined)
      .filter((id) => !!id);
    // производим подписание
    if (ids.length > 0) {
      const isSuccess = yield call(signatureSagas.signDocumentsSaga, ids);
      // eslint-disable-next-line max-depth
      if (isSuccess) {
        yield put(appealsActions.startAppealsListLoading());
        yield call(appealsSagas.updateAppealSaga);
        yield put(appealsActions.stopAppealsListLoading());
      }
    }
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Отклонить документ
 *
 * @returns {void}
 */
export function* rejectIncomingDocumentFlow() {
  try {
    yield put(appealsActions.startAppealsListLoading());
    const id = yield select(appealsSelectors.currentAppealId);
    yield call(incomingDocumentsSagas.rejectIncomingDocumentSaga, id);
    yield call(appealsSagas.updateAppealSaga);
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  } finally {
    yield put(appealsActions.stopAppealsListLoading());
  }
}

/**
 * Вотчер сообщений
 *
 * @returns {void}
 */
export function* appealsWatcher() {
  yield all([
    takeEvery(appealsActions.loadAppealsFlow, loadAppealsFlow),
    takeEvery(appealsActions.loadAppealFlow, loadAppealFlow),
    takeEvery(appealsActions.sendMessageFlow, sendMessageFlow),
    takeEvery(appealsActions.signAndSendMessageFlow, signAndSendMessageFlow),
    takeEvery(
      appealsActions.rejectIncomingDocumentFlow,
      rejectIncomingDocumentFlow,
    ),
  ]);
}
