import { testSaga } from 'redux-saga-test-plan';

import { loadPaymentHistoryFlow } from './sagas.payment-history';

import { sagas as paymentSagas } from '@features/payment-history';

import { exceptionHandlerSaga } from './sagas.errors';

const error = new Error('Error');

describe('loadPaymentHistoryFlow - процесс загрузки истории платежей по договору', () => {
  const queryParams = { pagination: 1 };
  test('процесс выполняется успешно', () => {
    testSaga(loadPaymentHistoryFlow, { payload: queryParams })
      .next()
      .call(paymentSagas.loadPaymentHistorySaga, { queryParams })
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(loadPaymentHistoryFlow, { payload: queryParams })
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .isDone();
  });
});
