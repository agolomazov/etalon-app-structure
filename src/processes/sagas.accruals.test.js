import { testSaga } from 'redux-saga-test-plan';

import { loadAccrualsFlow } from './sagas.accruals';

import { sagas as accrualsSagas } from '@features/accruals';

import { exceptionHandlerSaga } from './sagas.errors';

const error = new Error('Error');

describe('loadAccrualsFlow - процесс загрузки начислений по договору', () => {
  const queryParams = { pagination: 1 };
  test('процесс выполняется успешно', () => {
    testSaga(loadAccrualsFlow, { payload: queryParams })
      .next()
      .call(accrualsSagas.loadAccrualsSaga, { queryParams })
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(loadAccrualsFlow, { payload: queryParams })
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .isDone();
  });
});
