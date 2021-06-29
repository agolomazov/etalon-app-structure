import { call, put, select } from 'redux-saga/effects';

import {
  actions as situationsActions,
  selectors as situationsSelectors,
  sagas as situationsSagas,
} from '@features/situations';

import { registrationLifeSituation } from './sagas.base-life-situation';

const { detailsJuridical: detailsJuridicalActions } = situationsActions;
const { detailsJuridical: detailsJuridicalSelectors } = situationsSelectors;
const { detailsJuridical: detailsJuridicalSagas } = situationsSagas;

/**
 * Выход из жизненной ситуации "Изменить реквизиты ЮЛ"
 *
 * @returns {void}
 */
export function* exitLifeSituationFlow() {
  yield put(detailsJuridicalActions.reset());
}

/**
 * Выбор типа обращения по ЖС "Изменить реквизиты ЮЛ"
 *
 * @params {object} action - экшн
 * @params {string} action.payload - тип обращения
 *
 * @returns {void}
 */
export function* chooseAppealTypeFlow({ payload: appealType }) {
  // кладем тип обращения в стор
  yield put(detailsJuridicalActions.setAppealType(appealType));
  // получаем id обращения
  const { id } = yield select(detailsJuridicalSelectors.appeal);
  // если нет id, создаем обращение
  if (!id) {
    try {
      // показываем loader
      yield put(situationsActions.startLoading());

      // создаем обращение
      yield call(detailsJuridicalSagas.createAppealSaga);
    } finally {
      // скрываем loader
      yield put(situationsActions.stopLoading());
    }
  }
}

/**
 * Вотчер для процессов ЖС "Изменить реквизиты ЮЛ"
 */
export const situationChangeDetailsJuridicalWatcher = registrationLifeSituation(
  {
    exitProcess: {
      action: detailsJuridicalActions.beforeExitLifeSituationFlow,
      process: exitLifeSituationFlow,
    },
    subProcesses: [
      {
        action: detailsJuridicalActions.chooseAppealTypeFlow,
        process: chooseAppealTypeFlow,
      },
    ],
  },
);
