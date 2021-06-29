import { call, put } from 'redux-saga/effects';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';

/**
 * Сага для загрузка списка арендодателей
 *
 * @returns {void}
 */
function* loadLandlordsSaga() {
  // загружаем список арендодателей
  const { landlords } = yield call(callApi, api.getLandlords);

  // кладем полученные данные в стор
  yield put(actions.setLandlords(landlords));
}

export const sagas = {
  loadLandlordsSaga,
};
