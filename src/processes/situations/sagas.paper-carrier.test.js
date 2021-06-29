import { testSaga } from 'redux-saga-test-plan';

import {
  actions as situationsActions,
  selectors as situationsSelectors,
  sagas as situationsSagas,
} from '@features/situations';

const { paperCarrier: paperCarrierActions } = situationsActions;
const { paperCarrier: paperCarrierSelectors } = situationsSelectors;
const { paperCarrier: paperCarrierSagas } = situationsSagas;

import {
  chooseAppealTypeFlow,
  exitLifeSituationFlow,
} from './sagas.paper-carrier';

describe('chooseAppealTypeFlow - Выбор типа обращения по ЖС "Заявление на получение / на отказ от получения документов на бумажном носителе"', () => {
  test('процесс выполняется успешно', () => {
    const appealType = 'APPEAL_TYPE';
    const appealId = 1;

    testSaga(chooseAppealTypeFlow, { payload: appealType })
      .next()
      .put(paperCarrierActions.setAppealType(appealType))
      .next()
      .select(paperCarrierSelectors.appeal)

      .save('before condition')
      .next({})
      .put(situationsActions.startLoading())
      .next()
      .call(paperCarrierSagas.createAppealSaga)
      .next()
      .put(situationsActions.stopLoading())
      .next()
      .isDone()

      .restore('before condition')
      .next({ id: appealId })
      .isDone();
  });
});

describe('exitLifeSituationFlow - Выход из ЖС "Заявление на получение / на отказ от получения документов на бумажном носителе"', () => {
  test('процесс выполняется успешно', () => {
    testSaga(exitLifeSituationFlow)
      .next()
      .put(paperCarrierActions.reset())
      .next()
      .isDone();
  });
});
