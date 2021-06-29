import { SITUATION_APPEAL_TYPES } from '../../constants';
import { sagas as situationsSagas } from '../../sagas';

import { actions } from './ducks';

/**
 * Создание обращения
 */
const createAppealSaga = situationsSagas.createAppealSagaFactory(
  SITUATION_APPEAL_TYPES.CONTRACT_MISSED,
  {
    addAppeal: actions.addAppeal,
  },
);

export const sagas = {
  createAppealSaga,
};
