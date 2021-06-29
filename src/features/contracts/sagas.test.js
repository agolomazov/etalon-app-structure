import { testSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { equals } from 'ramda';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';
import { sagas } from './sagas';
import { selectors } from './selectors';

describe('loadContractsSaga - сага загружает список договоров и кладет его в стор', () => {
  test('Должно отработать запрос к API и положить данные в стор', () => {
    const contracts = {
      content: [1, 2, 3],
      size: 1,
      number: 1,
      totalElements: 1,
    };
    const pagination = {
      pageNumber: 1,
      totalItems: 1,
    };
    const lastQueryParams = {};
    const queryParams = {};
    const payload = {};

    testSaga(sagas.loadContractsSaga, { payload, queryParams })
      .next()
      .select(selectors.queryParams)
      .next(lastQueryParams)
      .call(equals, lastQueryParams, queryParams)

      .save('before equals')
      .next(true)
      .isDone()

      .restore('before equals')
      .next(false)
      .call(callApi, api.getContracts, [queryParams])
      .next(contracts)
      .put(actions.setContracts(contracts.content))
      .next()
      .put(actions.setPagination(pagination))
      .next()
      .put(actions.setQueryParams(payload));
  });
});

describe('loadContractsByIdsSaga - сага загружает и возвращает список договоров по их идентификаторам', () => {
  test('Сага должна вернуть пустой массив, если не переданы идентификаторы договоров', () => {
    testSaga(sagas.loadContractsByIdsSaga).next().returns([]);

    testSaga(sagas.loadContractsByIdsSaga, []).next().returns([]);
  });

  test('Сага должна отработать запрос к API и вернуть список договоров', () => {
    const ids = ['1', '2'];
    const contracts = [{ id: ids[0] }, { id: ids[1] }];

    testSaga(sagas.loadContractsByIdsSaga, ids)
      .next()
      .all([
        call(
          callApi,
          api.getContracts,
          [{ filters: { contractIds: ids } }],
          ['data', 'content'],
        ),
      ])
      .next([contracts])
      .returns(contracts);
  });
});
