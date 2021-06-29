import { call, put } from 'redux-saga/effects';

import {
  actions as situationsActions,
  sagas as situationsSagas,
} from '@features/situations';

import { sagas as contractsSagas } from '@features/contracts';

import { registrationLifeSituation } from './sagas.base-life-situation';

const { sublease: subleaseActions } = situationsActions;
const { sublease: subleaseSagas } = situationsSagas;

/**
 * Создание жизненной ситуации "Уведомление об субаренде"
 *
 * @returns {void}
 */
export function* createLifeSituationFlow() {
  // загружаем список договоров
  yield call(contractsSagas.loadContractsSaga);

  // создаем обращение
  yield call(subleaseSagas.createAppealSaga);
}

/**
 * Выход из жизненной ситуации "Уведомление об субаренде"
 *
 * @returns {void}
 */
export function* exitLifeSituationFlow() {
  yield put(subleaseActions.reset());
}

/**
 * Вотчер для процессов ЖС "Уведомление об субаренде"
 *
 */
export const situationSubleaseNoticeWatcher = registrationLifeSituation({
  startProcess: {
    action: subleaseActions.afterCreateLifeSituationFlow,
    process: createLifeSituationFlow,
  },
  exitProcess: {
    action: subleaseActions.beforeExitLifeSituationFlow,
    process: exitLifeSituationFlow,
  },
});
