import { testSaga } from 'redux-saga-test-plan';
import { fork, takeEvery } from 'redux-saga/effects';

import {
  actions as situationsActions,
  selectors as situationsSelectors,
  sagas as situationsSagas,
} from '@features/situations';

import { sagas as contractsSagas } from '@features/contracts';
import { sagas as landlordsSagas } from '@features/landlords';

import { registrationLifeSituation } from './sagas.base-life-situation';

import {
  createLifeSituationFlow,
  exitLifeSituationFlow,
  chooseAppealTypeFlow,
  situationComplaintWatcher,
} from './sagas.complaint';

import { loadContractsFlow } from '../sagas.contracts';

import { sagas, actions } from '@features/contracts';

const { complaint: complaintActions } = situationsActions;
const { complaint: complaintSelectors } = situationsSelectors;
const { complaint: complaintSagas } = situationsSagas;

const error = new Error('Error');

describe('createLifeSituationFlow - Создание жизненной ситуации "Жалоба"', () => {
  test('процесс выполняется успешно', () => {
    testSaga(createLifeSituationFlow)
      .next()
      .call(landlordsSagas.loadLandlordsSaga)
      .next()
      .isDone();
  });
});

describe('exitLifeSituationFlow - Выход из жизненной ситуации "Жалоба"', () => {
  test('процесс выполняется успешно', () => {
    testSaga(exitLifeSituationFlow)
      .next()
      .put(complaintActions.reset())
      .next()
      .isDone();
  });
});

describe('chooseAppealTypeFlow - Выбор типа обращения по ЖС "Жалоба"', () => {
  const appealType = {
    type: 'situations/complaint/setAppealType',
    payload: 'type',
  };
  const id = '1';
  test('процесс выполняется успешно - есть id', () => {
    testSaga(chooseAppealTypeFlow, { payload: appealType })
      .next()
      .put(complaintActions.setAppealType(appealType))
      .next(appealType)
      .select(complaintSelectors.appealId)
      .next(id)
      .isDone();
  });

  test('процесс выполняется успешно - нет id', () => {
    testSaga(chooseAppealTypeFlow, { payload: appealType })
      .next()
      .put(complaintActions.setAppealType(appealType))
      .next(appealType)
      .select(complaintSelectors.appealId)
      .next()
      .put(situationsActions.startLoading())
      .next()
      .call(complaintSagas.createAppealSaga)
      .next()
      .put(situationsActions.stopLoading())
      .next()
      .isDone();
  });
});
