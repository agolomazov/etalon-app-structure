import { call, put, select } from 'redux-saga/effects';

import {
  actions as situationsActions,
  selectors as situationsSelectors,
  sagas as situationsSagas,
} from '@features/situations';

import { sagas as contractsSagas } from '@features/contracts';

import { registrationLifeSituation } from './sagas.base-life-situation';

const { reconciliationAct: reconcilActions } = situationsActions;
const { reconciliationAct: reconcilSelectors } = situationsSelectors;
const { reconciliationAct: reconcilSagas } = situationsSagas;

/**
 * Создание жизненной ситуации Акт сверки
 *
 * @returns {void}
 */
export function* createLifeSituationFlow() {
  // загружаем список договоров
  yield call(contractsSagas.loadContractsSaga);
}

/**
 * Выход из жизненной ситуации Акт сверки
 *
 * @returns {void}
 */
export function* exitLifeSituationFlow() {
  yield put(reconcilActions.reset());
}

/**
 * Выбор типа обращения по ЖС Акт сверки
 *
 * @params {object} action - экшн
 * @params {string} action.payload - тип обращения
 *
 * @returns {void}
 */
export function* chooseAppealTypeFlow({ payload: appealType }) {
  // кладем тип обращения в стор
  yield put(reconcilActions.setAppealType(appealType));

  const appeals = yield select(reconcilSelectors.appealsCurrent);

  // создадим первое обращение
  if (appeals && appeals.length === 0) {
    yield call(reconcilSagas.createAppealSaga);
  }
}

/**
 * Создание обращения по ЖС Акт сверки
 *
 * @returns {void}
 */
export function* createAppealFlow() {
  yield call(reconcilSagas.createAppealSaga);
}

/**
 * Удаление обращения по ЖС Акт сверки
 *
 * @returns {void}
 */
export function* deleteAppealFlow({ payload: appealId }) {
  yield call(reconcilSagas.deleteAppealSaga, appealId);
}

/**
 * Вотчер для процессов ЖС Акт сверки
 */
export const situationReconciliationActWatcher = registrationLifeSituation({
  startProcess: {
    action: reconcilActions.afterCreateLifeSituationFlow,
    process: createLifeSituationFlow,
  },
  exitProcess: {
    action: reconcilActions.beforeExitLifeSituationFlow,
    process: exitLifeSituationFlow,
  },
  subProcesses: [
    {
      action: reconcilActions.chooseAppealTypeFlow,
      process: chooseAppealTypeFlow,
    },
    {
      action: reconcilActions.createAppealFlow,
      process: createAppealFlow,
    },
    {
      action: reconcilActions.deleteAppealFlow,
      process: deleteAppealFlow,
    },
  ],
});
