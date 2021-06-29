import { call, put } from 'redux-saga/effects';

import {
  actions as situationsActions,
  sagas as situationsSagas,
} from '@features/situations';

import { sagas as contractsSagas } from '@features/contracts';

import { registrationLifeSituation } from './sagas.base-life-situation';

const { paymentMissed: paymentMissedActions } = situationsActions;
const { paymentMissed: paymentMissedSagas } = situationsSagas;

/**
 * Создание жизненной ситуации "Отсутствует платеж по договору аренды"
 *
 * @returns {void}
 */
export function* createLifeSituationFlow() {
  // создаем обращение
  yield call(paymentMissedSagas.createAppealSaga);
  // загружаем список договоров
  yield call(contractsSagas.loadContractsSaga);
}

/**
 * Выход из жизненной ситуации "Отсутствует платеж по договору аренды"
 *
 * @returns {void}
 */
export function* exitLifeSituationFlow() {
  yield put(paymentMissedActions.reset());
}

/**
 * Вотчер для процессов ЖС "Отсутствует платеж по договору аренды"
 */
export const situationPaymentMissedWatcher = registrationLifeSituation({
  startProcess: {
    action: paymentMissedActions.afterCreateLifeSituationFlow,
    process: createLifeSituationFlow,
  },
  exitProcess: {
    action: paymentMissedActions.beforeExitLifeSituationFlow,
    process: exitLifeSituationFlow,
  },
});
