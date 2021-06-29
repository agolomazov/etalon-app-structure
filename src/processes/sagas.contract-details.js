import { call, put, all, takeEvery } from 'redux-saga/effects';

import {
  actions as contractActions,
  api as contractApi,
  sagas as contractSagas,
} from '@features/contract-details';

import { sagas as appealsSaga } from '@features/messages';

import { callApi, downloadFile, addDateToFileName } from '@common/utils';
import { exceptionHandlerSaga } from './sagas.errors';

/**
 * Загрузка данных договора
 *
 * @param {object} action - экшен
 * @param {string} action.payload - ID договора
 *
 * @returns {void}
 */
export function* loadContractDetailsFlow({ payload: contractId }) {
  try {
    // показываем loader
    yield put(contractActions.startLoading());

    // загружаем детали и обращения для договора
    yield all([
      call(contractSagas.loadContractDetailsSaga, contractId),
      call(appealsSaga.loadContractAppealsSaga, contractId),
    ]);
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  } finally {
    // скрываем loader
    yield put(contractActions.stopLoading());
  }
}

/**
 * Формирование квитанции
 *
 * @param {object} action - экшен
 * @param {string} action.payload - ID договора
 *
 * @returns {void}
 */
export function* loadContractReceiptFlow({ payload: contractId }) {
  try {
    yield put(contractActions.startLoading());
    // отправляем запрос на бекенд, получаем сформированную квитанцию
    const data = yield call(callApi, contractApi.getContractReceipt, [
      contractId,
    ]);
    yield put(contractActions.stopLoading());
    // скачиваем сформированную квитанцию
    yield call(downloadFile, data, addDateToFileName('Квитанция', 'pdf'));
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Формирование выгрузки 1с
 *
 * @param {object} action - экшен
 * @param {string} action.payload - ID договора
 *
 * @returns {void}
 */
export function* loadContract1cFlow({ payload: contractId }) {
  try {
    yield put(contractActions.startLoading());
    // отправляем запрос на бекенд, получаем выгрузку 1с
    const data = yield call(callApi, contractApi.getContract1c, [contractId]);
    yield put(contractActions.stopLoading());
    // скачиваем сформированную выгрузку 1с
    yield call(downloadFile, data, addDateToFileName('1С', 'xml'));
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Вотчер данных договора
 *
 * @returns {void}
 */
export function* contractDataWatcher() {
  yield all([
    takeEvery(contractActions.loadContractDetailsFlow, loadContractDetailsFlow),
    takeEvery(contractActions.loadContractReceiptFlow, loadContractReceiptFlow),
    takeEvery(contractActions.loadContract1cFlow, loadContract1cFlow),
  ]);
}
