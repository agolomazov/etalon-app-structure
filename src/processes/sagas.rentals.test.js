import { testSaga } from 'redux-saga-test-plan';

import { selectors as appSettingsSelectors } from '@features/app-settings';
import { sagas as rentalsSagas } from '@features/rental-objects';

import { exceptionHandlerSaga } from './sagas.errors';
import { loadRentalsFlow } from './sagas.rentals';

const error = new Error('Error');

describe('loadRentalsFlow - загрузка списка объектов аренды', () => {
  const payload = {};
  const queryParams = {};
  const isRentalsBeFiltrationEnabled = true;

  test('процесс выполняется успешно', () => {
    testSaga(loadRentalsFlow, { payload })
      .next()
      .select(appSettingsSelectors.isRentalsBeFiltrationEnabled)
      .next(isRentalsBeFiltrationEnabled)
      .call(rentalsSagas.loadRentalsSaga, {
        queryParams,
        isClientSideFilteringEnable: !isRentalsBeFiltrationEnabled,
      })
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    const payload = {};

    testSaga(loadRentalsFlow, { payload })
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .isDone();
  });
});
