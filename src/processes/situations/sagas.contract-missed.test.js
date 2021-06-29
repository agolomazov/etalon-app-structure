import { testSaga } from 'redux-saga-test-plan';

import {
  actions as situationsActions,
  sagas as situationsSagas,
} from '@features/situations';

import { sagas as landlordsSagas } from '@features/landlords';

const { contractMissed: contractMissedActions } = situationsActions;
const { contractMissed: contractMissedSagas } = situationsSagas;

import {
  createLifeSituationFlow,
  exitLifeSituationFlow,
} from './sagas.contract-missed';

describe('createLifeSituationFlow - Создание жизненной ситуации "Отсутствует договор аренды"', () => {
  test('процесс выполняется успешно', () => {
    testSaga(createLifeSituationFlow)
      .next()
      .call(landlordsSagas.loadLandlordsSaga)
      .next()
      .call(contractMissedSagas.createAppealSaga)
      .next()
      .isDone();
  });
});

describe('exitLifeSituationFlow - Выход из жизненной ситуации "Отсутствует договор аренды"', () => {
  test('процесс выполняется успешно', () => {
    testSaga(exitLifeSituationFlow)
      .next()
      .put(contractMissedActions.reset())
      .next()
      .isDone();
  });
});
