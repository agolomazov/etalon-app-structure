import { call, put } from 'redux-saga/effects';

import {
  actions as situationsActions,
  sagas as situationsSagas,
} from '@features/situations';

import { sagas as landlordsSagas } from '@features/landlords';

import { registrationLifeSituation } from './sagas.base-life-situation';

const { noSuitable: noSuitableActions } = situationsActions;
const { noSuitable: noSuitableSagas } = situationsSagas;

/**
 * Создание жизненной ситуации "Нет подходящей ЖС"
 *
 * @returns {void}
 */
export function* createLifeSituationFlow() {
  // загружаем список арендодателей
  yield call(landlordsSagas.loadLandlordsSaga);
  // создаем обращение
  yield call(noSuitableSagas.createAppealSaga);
}

/**
 * Выход из жизненной ситуации "Нет подходящей ЖС"
 *
 * @returns {void}
 */
export function* exitLifeSituationFlow() {
  yield put(noSuitableActions.reset());
}

/**
 * Вотчер для процессов ЖС "Нет подходящей ЖС"
 */
export const situationNoSuitableWatcher = registrationLifeSituation({
  startProcess: {
    action: noSuitableActions.afterCreateLifeSituationFlow,
    process: createLifeSituationFlow,
  },
  exitProcess: {
    action: noSuitableActions.beforeExitLifeSituationFlow,
    process: exitLifeSituationFlow,
  },
});
