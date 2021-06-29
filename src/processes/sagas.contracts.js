import { call, all, takeEvery, put, select } from 'redux-saga/effects';

import { selectors as appSettingsSelectors } from '@features/app-settings';

import {
  actions as contractsActions,
  sagas as contractsSagas,
} from '@features/contracts';

import { exceptionHandlerSaga } from './sagas.errors';

/**
 * Загрузка списка договоров
 *
 * @returns {void}
 */
export function* loadContractsFlow({ payload: queryParams }) {
  try {
    yield put(contractsActions.startLoading());

    // получаем параметры приложения
    const isContractsBeFiltrationEnabled = yield select(
      appSettingsSelectors.isContractsBeFiltrationEnabled,
    );

    yield call(contractsSagas.loadContractsSaga, {
      queryParams,
      isClientSideFilteringEnable: !isContractsBeFiltrationEnabled,
    });
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  } finally {
    yield put(contractsActions.stopLoading());
  }
}

/**
 * Вотчер договоров
 *
 * @returns {void}
 */
export function* contractsWatcher() {
  yield all([takeEvery(contractsActions.loadContractsFlow, loadContractsFlow)]);
}
