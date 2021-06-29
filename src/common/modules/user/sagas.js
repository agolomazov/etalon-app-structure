import { call, put, select } from 'redux-saga/effects';

import { callApi } from '@common/utils';

import { ERROR_CODES } from '@src/constants';

import { api } from './api';
import { actions } from './ducks';
import { selectors } from './selectors';
import {
  NoActiveCompanyError,
  UnconfirmedUserError,
  NoConsentToEdmError,
} from './errors';

/**
 * Сага для загрузки данных пользователя
 *
 * @returns {void}
 */
function* loadUserSaga() {
  // отправляем запрос на бекенд, получаем данные пользователя
  const user = yield call(callApi, api.getUser);

  // если неподтвержденная УЗ, бросаем ошибку
  if (user.error && user.error.errorCode === ERROR_CODES.UNCONFIRMED_USER) {
    throw new UnconfirmedUserError();
  }

  // кладем полученные данные в стор
  yield put(actions.setUser(user));
}

/**
 * Сага проверяет выбрана ли компания
 *
 * @returns {void}
 */
function* checkUserActiveCompanySaga() {
  const { activeCompany } = yield select(selectors.userData) || {};
  // если не выброна активная компания, бросаем ошибку
  if (!activeCompany) {
    throw new NoActiveCompanyError();
  }
}

/**
 * Сага проверяет есть ли согласие на ЭДО
 *
 * @returns {void}
 */
function* checkUserConsentToEdmSaga() {
  const isUserConsentToEdm = yield select(selectors.isUserConsentToEdm);
  // если не дано согласие на ЭДО, бросаем ошибку
  if (!isUserConsentToEdm) {
    throw new NoConsentToEdmError();
  }
}

export const sagas = {
  loadUserSaga,
  checkUserActiveCompanySaga,
  checkUserConsentToEdmSaga,
};
