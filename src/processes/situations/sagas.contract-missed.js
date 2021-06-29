import { call, put } from 'redux-saga/effects';

import {
  actions as situationsActions,
  sagas as situationsSagas,
} from '@features/situations';

import { sagas as landlordsSagas } from '@features/landlords';

import { registrationLifeSituation } from './sagas.base-life-situation';

const { contractMissed: contractMissedActions } = situationsActions;
const { contractMissed: contractMissedSagas } = situationsSagas;

/**
 * Создание жизненной ситуации "Отсутствует договор аренды"
 *
 * @returns {void}
 */
export function* createLifeSituationFlow() {
  // загружаем список арендодателей
  yield call(landlordsSagas.loadLandlordsSaga);

  // создаем обращение
  yield call(contractMissedSagas.createAppealSaga);
}

/**
 * Выход из жизненной ситуации "Отсутствует договор аренды"
 *
 * @returns {void}
 */
export function* exitLifeSituationFlow() {
  yield put(contractMissedActions.reset());
}

/**
 * Вотчер для процессов ЖС "Отсутствует договор аренды"
 */
export const situationContractMissedWatcher = registrationLifeSituation({
  startProcess: {
    action: contractMissedActions.afterCreateLifeSituationFlow,
    process: createLifeSituationFlow,
  },
  exitProcess: {
    action: contractMissedActions.beforeExitLifeSituationFlow,
    process: exitLifeSituationFlow,
  },
});
