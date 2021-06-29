import { testSaga } from 'redux-saga-test-plan';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';
import { sagas } from './sagas';

describe('loadContractDetailsSaga - сага загружает детали договора и кладет его в стор', () => {
  test('Должно отработать запрос к API и положить данные в стор', async () => {
    const contractId = '1';
    const contractDetails = { id: contractId };
    testSaga(sagas.loadContractDetailsSaga, contractId)
      .next()
      .call(callApi, api.getContractInfo, [contractId], ['data'])
      .next(contractDetails)
      .put(actions.setContractDetails(contractDetails));
  });
});
