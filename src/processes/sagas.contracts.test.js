import { testSaga } from 'redux-saga-test-plan';

import { sagas, actions } from '@features/contracts';
import { selectors as appSettingsSelectors } from '@features/app-settings';

import { exceptionHandlerSaga } from './sagas.errors';
import { loadContractsFlow } from './sagas.contracts';

const error = new Error('Error');

describe('loadContractsFlow - Загрузка списка договоров', () => {
  const contracts = [1, 2, 3];
  const payload = {};
  const queryParams = {};
  const isContractsBeFiltrationEnabled = true;
  test('процесс выполняется успешно', () => {
    testSaga(loadContractsFlow, { payload })
      .next()
      .put(actions.startLoading())
      .next()
      .select(appSettingsSelectors.isContractsBeFiltrationEnabled)
      .next(isContractsBeFiltrationEnabled)
      .call(sagas.loadContractsSaga, {
        queryParams,
        isClientSideFilteringEnable: !isContractsBeFiltrationEnabled,
      })
      .next(contracts)
      .put(actions.stopLoading())
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(loadContractsFlow, payload)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .put(actions.stopLoading())
      .next()
      .isDone();
  });
});
