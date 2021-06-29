import { testSaga } from 'redux-saga-test-plan';

import { APP_QUERY_PARAMS } from '@src/constants';

import {
  actions as situationsActions,
  selectors as situationsSelectors,
  sagas as situationsSagas,
} from '@features/situations';

import {
  selectors as contactsSelectors,
  sagas as contractsSagas,
} from '@features/contracts';

import { selectors as navigationSelectors } from '@features/navigation';

const { overpayment: overpaymentActions } = situationsActions;
const { overpayment: overpaymentSelectors } = situationsSelectors;
const { overpayment: overpaymentSagas } = situationsSagas;

import {
  createLifeSituationFlow,
  exitLifeSituationFlow,
  chooseAppealTypeFlow,
} from './sagas.overpayment';

describe('createLifeSituationFlow - Создание жизненной ситуации "Распорядиться переплатой"', () => {
  const contracts = [{ id: 1 }, { id: 2 }];

  test('процесс выполняется успешно', () => {
    testSaga(createLifeSituationFlow)
      .next()
      .call(contractsSagas.loadContractsSaga)
      .next()
      .select(contactsSelectors.contractsList)
      .next(contracts)
      .select(navigationSelectors.queryParams)

      .save('before condition')
      .next({ [APP_QUERY_PARAMS.CONTRACT_ID]: 1 })
      .put(overpaymentActions.setContract(contracts[0]))
      .next()
      .isDone()

      .restore('before condition')
      .next({ [APP_QUERY_PARAMS.CONTRACT_ID]: 3 })
      .next()
      .isDone();
  });
});

describe('exitLifeSituationFlow - Выход из жизненной ситуации "Распорядиться переплатой"', () => {
  test('процесс выполняется успешно', () => {
    testSaga(exitLifeSituationFlow)
      .next()
      .put(overpaymentActions.reset())
      .next()
      .isDone();
  });
});

describe('chooseAppealTypeFlow - Выбор типа обращения по ЖС "Распорядиться переплатой"', () => {
  test('процесс выполняется успешно', () => {
    const appealType = 'APPEAL_TYPE';
    const appealId = 1;

    testSaga(chooseAppealTypeFlow, { payload: appealType })
      .next()
      .put(overpaymentActions.setAppealType(appealType))
      .next()
      .select(overpaymentSelectors.appealId)

      .save('before condition')
      .next()
      .put(situationsActions.startLoading())
      .next()
      .call(overpaymentSagas.createAppealSaga)
      .next()
      .put(overpaymentActions.addPaymentOrder())
      .next()
      .put(situationsActions.stopLoading())
      .next()
      .isDone()

      .restore('before condition')
      .next(appealId)
      .isDone();
  });
});
