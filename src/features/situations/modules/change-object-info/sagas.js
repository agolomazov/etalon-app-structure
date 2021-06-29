import { select } from 'redux-saga/effects';

import { sagas as situationsSagas } from '../../sagas';

import { APPEAL_TYPE_MAP } from './constants';
import { actions } from './ducks';
import { selectors } from './selectors';

/**
 * Получить тип обращения
 *
 * @returns {string} тип обращения, одно из SITUATION_APPEAL_TYPES.MISSING_DATA, SITUATION_APPEAL_TYPES.CHANGE_OBJECT_INFO
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
    addAppeal: actions.addAppeal,
  },
);

export const sagas = {
  createAppealSaga,
};
