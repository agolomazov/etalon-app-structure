import { testSaga } from 'redux-saga-test-plan';

import {
  actions as situationsActions,
  selectors as situationsSelectors,
  sagas as situationsSagas,
} from '@features/situations';

const { detailsJuridical: detailsJuridicalActions } = situationsActions;
const { detailsJuridical: detailsJuridicalSelectors } = situationsSelectors;
const { detailsJuridical: detailsJuridicalSagas } = situationsSagas;

import {
  exitLifeSituationFlow,
  chooseAppealTypeFlow,
} from './sagas.change-details-juridical';

describe('exitLifeSituationFlow - Выход из жизненной ситуации "Изменить реквизиты ЮЛ"', () => {
  test('процесс выполняется успешно', () => {
    testSaga(exitLifeSituationFlow)
      .next()
      .put(detailsJuridicalActions.reset())
      .next()
      .isDone();
  });
});

describe('chooseAppealTypeFlow - Выбор типа обращения по ЖС "Изменить реквизиты ЮЛ"', () => {
  test('процесс выполняется успешно', () => {
    const appealType = 'APPEAL_TYPE';
    const appealId = 1;
    testSaga(chooseAppealTypeFlow, { payload: appealType })
      .next()
      .put(detailsJuridicalActions.setAppealType(appealType))
      .next()
      .select(detailsJuridicalSelectors.appeal)

      .save('before condition')
      .next({})
      .put(situationsActions.startLoading())
      .next()
      .call(detailsJuridicalSagas.createAppealSaga)
      .next()
      .put(situationsActions.stopLoading())
      .next()
      .isDone()

      .restore('before condition')
      .next({ id: appealId })
      .isDone();
  });
});
