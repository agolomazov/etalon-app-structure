import { call, put, select } from 'redux-saga/effects';

import {
  actions as situationsActions,
  selectors as situationsSelectors,
  sagas as situationsSagas,
} from '@features/situations';

import { registrationLifeSituation } from './sagas.base-life-situation';

const { paperCarrier: paperCarrierActions } = situationsActions;
const { paperCarrier: paperCarrierSelectors } = situationsSelectors;
const { paperCarrier: paperCarrierSagas } = situationsSagas;

/**
 * Выход из жизненной ситуации "Заявление на получение / на отказ от получения документов на бумажном носителе"
 *
 * @returns {void}
 */
export function* exitLifeSituationFlow() {
  yield put(paperCarrierActions.reset());
}

/**
 * Выбор типа обращения по ЖС "Заявление на получение / на отказ от получения документов на бумажном носителе"
 *
 * @params {object} action - экшн
 * @params {string} action.payload - тип обращения
 *
 * @returns {void}
 */
export function* chooseAppealTypeFlow({ payload: appealType }) {
  // кладем тип обращения в стор
  yield put(paperCarrierActions.setAppealType(appealType));
  // получаем id обращения
  const { id } = yield select(paperCarrierSelectors.appeal);
  // если нет id, создаем обращение
  if (!id) {
    try {
      // показываем loader
      yield put(situationsActions.startLoading());

      // создаем обращение
      yield call(paperCarrierSagas.createAppealSaga);
    } finally {
      // скрываем loader
      yield put(situationsActions.stopLoading());
    }
  }
}

/**
 * Вотчер для процессов ЖС "Заявление на получение / на отказ от получения документов на бумажном носителе"
 */
export const situationPaperCarrierWatcher = registrationLifeSituation({
  exitProcess: {
    action: paperCarrierActions.beforeExitLifeSituationFlow,
    process: exitLifeSituationFlow,
  },
  subProcesses: [
    {
      action: paperCarrierActions.chooseAppealTypeFlow,
      process: chooseAppealTypeFlow,
    },
  ],
});
