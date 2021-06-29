import { testSaga } from 'redux-saga-test-plan';
import { takeEvery, call } from 'redux-saga/effects';

import { callApi, downloadFile, addDateToFileName } from '@common/utils';

import {
  actions as contractActions,
  api as contractApi,
  sagas as contractSagas,
} from '@features/contract-details';

import { sagas as appealsSaga } from '@features/messages';

import {
  loadContractDetailsFlow,
  loadContractReceiptFlow,
  loadContract1cFlow,
  contractDataWatcher,
} from './sagas.contract-details';

import { exceptionHandlerSaga } from './sagas.errors';

const error = new Error('Error');
const contractId = '1';
const action = { payload: contractId };

describe('loadContractDetailsFlow - Загрузка деталей договора', () => {
  test('процесс выполняется успешно', () => {
    const contractId = '1';

    testSaga(loadContractDetailsFlow, action)
      .next()
      .put(contractActions.startLoading())
      .next()
      .all([
        call(contractSagas.loadContractDetailsSaga, contractId),
        call(appealsSaga.loadContractAppealsSaga, contractId),
      ])
      .next()
      .put(contractActions.stopLoading())
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(loadContractDetailsFlow, action)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .put(contractActions.stopLoading())
      .next()
      .isDone();
  });
});

describe('loadContractReceiptFlow - Формирование квитанции ПД4', () => {
  test('процесс выполняется успешно', () => {
    const receiptForm = 'form';

    testSaga(loadContractReceiptFlow, action)
      .next()
      .put(contractActions.startLoading())
      .next()
      .call(callApi, contractApi.getContractReceipt, [contractId])
      .next(receiptForm)
      .put(contractActions.stopLoading())
      .next()
      .call(downloadFile, receiptForm, addDateToFileName('Квитанция', 'pdf'))
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(loadContractReceiptFlow, action)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .isDone();
  });
});

describe('loadContract1cFlow - Формирование выгрузки 1с', () => {
  test('процесс выполняется успешно', () => {
    const form1c = 'form';

    testSaga(loadContract1cFlow, action)
      .next()
      .put(contractActions.startLoading())
      .next()
      .call(callApi, contractApi.getContract1c, [contractId])
      .next(form1c)
      .put(contractActions.stopLoading())
      .next()
      .call(downloadFile, form1c, addDateToFileName('1С', 'xml'))
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(loadContract1cFlow, action)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .isDone();
  });
});

describe('contractDataWatcher - Вотчер данных договора', () => {
  test('процесс выполняется успешно', () => {
    testSaga(contractDataWatcher)
      .next()
      .all([
        takeEvery(
          contractActions.loadContractDetailsFlow,
          loadContractDetailsFlow,
        ),
        takeEvery(
          contractActions.loadContractReceiptFlow,
          loadContractReceiptFlow,
        ),
        takeEvery(contractActions.loadContract1cFlow, loadContract1cFlow),
      ]);
  });
});
