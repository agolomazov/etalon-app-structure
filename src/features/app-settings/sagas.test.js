import { testSaga } from 'redux-saga-test-plan';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';
import { sagas } from './sagas';

describe('loadAppSettingsSaga - Сага для загрузка параметров приложения', () => {
  test('Сага должна отработать запрос к API и положить данные в стор', () => {
    const settings = {
      facilityRentalBeFiltrationEnabled: false,
      contractsBeFiltrationEnabled: true,
      accrualsBeFiltrationEnabled: false,
      paymentHistoryBeFiltrationEnabled: true,
    };

    testSaga(sagas.loadAppSettingsSaga)
      .next()
      .call(callApi, api.getAppSettings)
      .next(settings)
      .put(
        actions.setSettings({
          isRentalsBeFiltrationEnabled:
            settings.facilityRentalBeFiltrationEnabled,
          isContractsBeFiltrationEnabled: settings.contractsBeFiltrationEnabled,
          isAccrualsBeFiltrationEnabled: settings.accrualsBeFiltrationEnabled,
          isPaymentHistoryBeFiltrationEnabled:
            settings.paymentHistoryBeFiltrationEnabled,
        }),
      )
      .next()
      .isDone();
  });
});
