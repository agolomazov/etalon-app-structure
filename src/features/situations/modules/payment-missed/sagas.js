import { SITUATION_APPEAL_TYPES } from '../../constants';
import { sagas as situationsSagas } from '../../sagas';

import { actions } from './ducks';

/**
 * Создание обращения
 */
const createAppealSaga = situationsSagas.createAppealSagaFactory(
  SITUATION_APPEAL_TYPES.PAYMENT_MISSED,
  {
    startLoading: actions.startLoading,
    stopLoading: actions.stopLoading,
    addAppeal: actions.addAppeal,
  },
);

export const sagas = {
  createAppealSaga,
};
