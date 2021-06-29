import { call, put } from 'redux-saga/effects';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';

/**
 * Сага для загрузка справочников
 *
 * @returns {void}
 */
function* loadDictionariesSaga() {
  // загружаем справочники
  const dictionaries = yield call(callApi, api.getDictionaries);

  // кладем полученные данные в стор
  yield put(actions.setDictionaries(dictionaries));
}

export const sagas = {
  loadDictionariesSaga,
};
