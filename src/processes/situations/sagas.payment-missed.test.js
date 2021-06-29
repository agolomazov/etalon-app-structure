import { testSaga } from 'redux-saga-test-plan';

import {
  actions as situationsActions,
  sagas as situationsSagas,
} from '@features/situations';

import { sagas as contractsSagas } from '@features/contracts';

const { paymentMissed: paymentMissedActions } = situationsActions;
const { paymentMissed: paymentMissedSagas } = situationsSagas;

import {
  createLifeSituationFlow,
  exitLifeSituationFlow,
} from './sagas.payment-missed';

describe('createLifeSituationFlow - Создание жизненной ситуации "Отсутствует платеж по договору аренды"', () => {
  test('процесс выполняется успешно', () => {
    testSaga(createLifeSituationFlow)
      .next()
      .call(paymentMissedSagas.createAppealSaga)
      .next()
      .call(contractsSagas.loadContractsSaga)
      .next()
      .isDone();
  });
});

describe('exitLifeSituationFlow - Выход из жизненной ситуации "Отсутствует платеж по договору аренды"', () => {
  test('процесс выполняется успешно', () => {
    testSaga(exitLifeSituationFlow)
      .next()
      .put(paymentMissedActions.reset())
      .next()
      .isDone();
  });
});
