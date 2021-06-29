import { call, put } from 'redux-saga/effects';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';

/**
 * Сага для загрузка параметров приложения
 *
 * @returns {void}
 */
function* loadAppSettingsSaga() {
  // загружаем параметры приложения
  const {
    facilityRentalBeFiltrationEnabled: isRentalsBeFiltrationEnabled,
    contractsBeFiltrationEnabled: isContractsBeFiltrationEnabled,
    accrualsBeFiltrationEnabled: isAccrualsBeFiltrationEnabled,
    paymentHistoryBeFiltrationEnabled: isPaymentHistoryBeFiltrationEnabled,
  } = yield call(callApi, api.getAppSettings);

  // кладем полученные данные в стор
  yield put(
    actions.setSettings({
      isRentalsBeFiltrationEnabled,
      isContractsBeFiltrationEnabled,
      isAccrualsBeFiltrationEnabled,
      isPaymentHistoryBeFiltrationEnabled,
    }),
  );
}

export const sagas = {
  loadAppSettingsSaga,
};
