import { testSaga } from 'redux-saga-test-plan';

import {
  actions as situationsActions,
  sagas as situationsSagas,
} from '@features/situations';

import { sagas as contractsSagas } from '@features/contracts';

const { sublease: subleaseActions } = situationsActions;
const { sublease: subleaseSagas } = situationsSagas;

import {
  createLifeSituationFlow,
  exitLifeSituationFlow,
} from './sagas.sublease-notice';

describe('createLifeSituationFlow - Создание жизненной ситуации "Уведомление об субаренде"', () => {
  test('процесс выполняется успешно', () => {
    testSaga(createLifeSituationFlow)
      .next()
      .call(contractsSagas.loadContractsSaga)
      .next()
      .call(subleaseSagas.createAppealSaga)
      .next()
      .isDone();
  });
});

describe('exitLifeSituationFlow - Выход из жизненной ситуации "Уведомление об субаренде"', () => {
  test('процесс выполняется успешно', () => {
    testSaga(exitLifeSituationFlow)
      .next()
      .put(subleaseActions.reset())
      .next()
      .isDone();
  });
});
