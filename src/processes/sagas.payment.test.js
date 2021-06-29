import { testSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';

import {
  sagas as contractDetailsSagas,
  selectors as contractDetailsSelectors,
} from '@features/contract-details';

import {
  actions as paymentActions,
  sagas as paymentSagas,
} from '@features/payment';

import { exceptionHandlerSaga } from './sagas.errors';

import { loadPaymentAccrualsFlow, goToPaymentFlow } from './sagas.payment';

const error = new Error('Error');

describe('loadPaymentAccrualsFlow - Процесс загрузки начислений для оплаты по договору', () => {
  test('процесс выполняется успешно', () => {
    const contractId = '1';

    testSaga(loadPaymentAccrualsFlow, { payload: contractId })
      .next()
      .put(paymentActions.accruals.startLoading())
      .next()
      .all([
        call(contractDetailsSagas.loadContractDetailsSaga, contractId),
        call(paymentSagas.loadPaymentAccrualsSaga, contractId),
      ])
      .next()
      .put(paymentActions.accruals.stopLoading())
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(loadPaymentAccrualsFlow, {})
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .put(paymentActions.accruals.stopLoading())
      .next()
      .isDone();
  });
});

describe('goToPaymentFlow - Процесс перехода к оплате выбранных начислений', () => {
  test('процесс выполняется успешно', () => {
    const contractId = '1';
    const contractNumber = '248/22';
    const contractDate = '2016-09-01';

    testSaga(goToPaymentFlow, { payload: { contractId } })
      .next()
      .select(contractDetailsSelectors.contractNumber)
      .next(contractNumber)
      .select(contractDetailsSelectors.contractDate)
      .next(contractDate)
      .call(paymentSagas.goToPaymentSaga, {
        contractId,
        contractNumber,
        contractDate,
      })
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(goToPaymentFlow, { payload: {} })
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .isDone();
  });
});
