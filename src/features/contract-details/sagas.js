import { call, put } from 'redux-saga/effects';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';

/**
 * Сага для загрузки деталей договора
 *
 * @param {string} contractId - ID договора
 *
 * @returns {void}
 */
function* loadContractDetailsSaga(contractId) {
  // отправляем запрос на бекенд, получаем детали договора
  const contractDetails = yield call(
    callApi,
    api.getContractInfo,
    [contractId],
    ['data'],
  );

  // кладем полученные данные в стор
  yield put(actions.setContractDetails(contractDetails));
}

export const sagas = { loadContractDetailsSaga };
