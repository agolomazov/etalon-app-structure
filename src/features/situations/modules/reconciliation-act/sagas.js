import { select } from 'redux-saga/effects';

import { sagas as situationsSagas } from '../../sagas';

import { APPEAL_TYPE_MAP } from './constants';
import { actions } from './ducks';
import { selectors } from './selectors';

/**
 * Получить тип обращения
 *
 * @returns {string} тип обращения, одно из SITUATION_APPEAL_TYPES
 */
function* getAppealTypeSaga() {
  const appealType = yield select(selectors.appealType);
  return APPEAL_TYPE_MAP[appealType].situationAppealType;
}

/**
 * Создание обращения
 */
const createAppealSaga = situationsSagas.createAppealSagaFactory(
  getAppealTypeSaga,
  {
    startLoading: actions.startCreateAppealLoading,
    stopLoading: actions.stopCreateAppealLoading,
    addAppeal: actions.addAppeal,
  },
);

/**
 * Удаление обращения
 */
const deleteAppealSaga = situationsSagas.deleteAppealSagaFactory({
  startLoading: actions.startDeleteAppealLoading,
  stopLoading: actions.stopDeleteAppealLoading,
  deleteAppeal: actions.deleteAppeal,
});

export const sagas = {
  createAppealSaga,
  deleteAppealSaga,
};
