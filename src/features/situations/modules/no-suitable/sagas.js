import { SITUATION_APPEAL_TYPES } from '../../constants';
import { sagas as situationsSagas } from '../../sagas';

import { actions } from './ducks';

/**
 * Создание обращения
 */
const createAppealSaga = situationsSagas.createAppealSagaFactory(
  SITUATION_APPEAL_TYPES.NO_SUITABLE,
  {
    addAppeal: actions.addAppeal,
  },
);

export const sagas = {
  createAppealSaga,
};
