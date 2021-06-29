import { call, put, select } from 'redux-saga/effects';

import {
  actions as situationsActions,
  selectors as situationsSelectors,
  sagas as situationsSagas,
} from '@features/situations';

import { sagas as landlordsSagas } from '@features/landlords';

import { registrationLifeSituation } from './sagas.base-life-situation';

const { complaint: complaintActions } = situationsActions;
const { complaint: complaintSelectors } = situationsSelectors;
const { complaint: complaintSagas } = situationsSagas;

/**
 * Создание жизненной ситуации "Жалоба"
 *
 * @returns {void}
 */
export function* createLifeSituationFlow() {
  // загружаем список арендодателей
  yield call(landlordsSagas.loadLandlordsSaga);
}

/**
 * Выход из жизненной ситуации "Жалоба"
 *
 * @returns {void}
 */
export function* exitLifeSituationFlow() {
  yield put(complaintActions.reset());
}

/**
 * Выбор типа обращения по ЖС "Жалоба"
 *
 * @params {object} action - экшн
 * @params {string} action.payload - тип обращения
 *
 * @returns {void}
 */
export function* chooseAppealTypeFlow({ payload: appealType }) {
  // кладем тип обращения в стор
  yield put(complaintActions.setAppealType(appealType));
  // получаем id обращения
  const id = yield select(complaintSelectors.appealId);
  // если нет id, создаем обращение
  if (!id) {
    try {
      // показываем loader
      yield put(situationsActions.startLoading());

      // создаем обращение
      yield call(complaintSagas.createAppealSaga);
    } finally {
      // скрываем loader
      yield put(situationsActions.stopLoading());
    }
  }
}

/**
 * Вотчер для процессов ЖС "Жалоба"
 */
export const situationComplaintWatcher = registrationLifeSituation({
  startProcess: {
    action: complaintActions.afterCreateLifeSituationFlow,
    process: createLifeSituationFlow,
  },
  exitProcess: {
    action: complaintActions.beforeExitLifeSituationFlow,
    process: exitLifeSituationFlow,
  },
  subProcesses: [
    {
      action: complaintActions.chooseAppealTypeFlow,
      process: chooseAppealTypeFlow,
    },
  ],
});
