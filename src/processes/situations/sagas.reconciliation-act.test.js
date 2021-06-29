import { testSaga } from 'redux-saga-test-plan';

import {
  actions as situationsActions,
  selectors as situationsSelectors,
  sagas as situationsSagas,
} from '@features/situations';

import { sagas as contractsSagas } from '@features/contracts';

const { reconciliationAct: reconcilActions } = situationsActions;
const { reconciliationAct: reconcilSelectors } = situationsSelectors;
const { reconciliationAct: reconcilSagas } = situationsSagas;

import {
  createLifeSituationFlow,
  exitLifeSituationFlow,
  chooseAppealTypeFlow,
  createAppealFlow,
  deleteAppealFlow,
} from './sagas.reconciliation-act';

describe('createLifeSituationFlow - Создание жизненной ситуации Акт сверки', () => {
  test('процесс выполняется успешно', () => {
    testSaga(createLifeSituationFlow)
      .next()
      .call(contractsSagas.loadContractsSaga)
      .next()
      .isDone();
  });
});

describe('exitLifeSituationFlow - Выход из жизненной ситуации Акт сверки', () => {
  test('процесс выполняется успешно', () => {
    testSaga(exitLifeSituationFlow)
      .next()
      .put(reconcilActions.reset())
      .next()
      .isDone();
  });
});

describe('chooseAppealTypeFlow - Выбор типа обращения по ЖС Акт сверки', () => {
  test('процесс выполняется успешно', () => {
    const appealType = 'APPEAL_TYPE';

    testSaga(chooseAppealTypeFlow, { payload: appealType })
      .next()
      .put(reconcilActions.setAppealType(appealType))
      .next()
      .select(reconcilSelectors.appealsCurrent)

      .save('before condition')
      .next([])
      .call(reconcilSagas.createAppealSaga)
      .next()
      .isDone()

      .restore('before condition')
      .next([1])
      .isDone();
  });
});

describe('createAppealFlow - Создание обращения по ЖС Акт сверки', () => {
  test('процесс выполняется успешно', () => {
    testSaga(createAppealFlow)
      .next()
      .call(reconcilSagas.createAppealSaga)
      .next()
      .isDone();
  });
});

describe('deleteAppealFlow - Удаление обращения по ЖС Акт сверки', () => {
  test('процесс выполняется успешно', () => {
    const appealId = 1;
    testSaga(deleteAppealFlow, { payload: appealId })
      .next()
      .call(reconcilSagas.deleteAppealSaga, appealId)
      .next()
      .isDone();
  });
});
