import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { callApi } from '@common/utils';

import { NoActiveCompanyError, NoConsentToEdmError } from './errors';

import { api } from './api';
import { actions } from './ducks';
import { selectors } from './selectors';
import { sagas } from './sagas';

test('loadUserSaga - сага загружает данные пользователя', () => {
  const user = {
    userData: 'test user',
  };

  testSaga(sagas.loadUserSaga)
    .next()
    .call(callApi, api.getUser)
    .next(user)
    .put(actions.setUser(user));
});

function* wrapperSaga(saga, error) {
  try {
    yield* saga();
  } catch (e) {
    if (e instanceof error) yield put({ type: 'error' });
  }
}

describe('checkUserActiveCompanySaga - cага проверяет выбрана ли компания', () => {
  test('сага выполняется успешно, если выбрана активная компания', () => {
    const company = {
      activeCompany: true,
    };

    testSaga(sagas.checkUserActiveCompanySaga)
      .next()
      .select(selectors.userData)
      .next(company);
  });

  test('сага бросает исключение, если не выбрана активная компания', () => {
    const company = {};
    testSaga(
      wrapperSaga,
      sagas.checkUserActiveCompanySaga,
      NoActiveCompanyError,
    )
      .next()
      .select(selectors.userData)
      .next(company)
      .put({ type: 'error' });
  });
});

describe('checkUserConsentToEdmSaga - cага проверяет есть ли согласие на ЭДО', () => {
  test('сага выполняется успешно, если есть согласиена ЭДО', () => {
    const isUserConsentToEdm = true;

    testSaga(sagas.checkUserConsentToEdmSaga)
      .next()
      .select(selectors.isUserConsentToEdm)
      .next(isUserConsentToEdm);
  });

  test('сага бросает исключение, если нет согласия на ЭДО', () => {
    const isUserConsentToEdm = false;
    testSaga(wrapperSaga, sagas.checkUserConsentToEdmSaga, NoConsentToEdmError)
      .next()
      .select(selectors.isUserConsentToEdm)
      .next(isUserConsentToEdm)
      .put({ type: 'error' });
  });
});
