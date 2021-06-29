import { testSaga } from 'redux-saga-test-plan';

import {
  actions as situationsActions,
  sagas as situationsSagas,
} from '@features/situations';

import { sagas as landlordsSagas } from '@features/landlords';

const { noSuitable: noSuitableActions } = situationsActions;
const { noSuitable: noSuitableSagas } = situationsSagas;

import {
  createLifeSituationFlow,
  exitLifeSituationFlow,
} from './sagas.no-suitable';

describe('createLifeSituationFlow - Создание жизненной ситуации "Нет подходящей ЖС"', () => {
  test('процесс выполняется успешно', () => {
    testSaga(createLifeSituationFlow)
      .next()
      .call(landlordsSagas.loadLandlordsSaga)
      .next()
      .call(noSuitableSagas.createAppealSaga)
      .next()
      .isDone();
  });
});

describe('exitLifeSituationFlow - Выход из жизненной ситуации "Нет подходящей ЖС"', () => {
  test('процесс выполняется успешно', () => {
    testSaga(exitLifeSituationFlow)
      .next()
      .put(noSuitableActions.reset())
      .next()
      .isDone();
  });
});
