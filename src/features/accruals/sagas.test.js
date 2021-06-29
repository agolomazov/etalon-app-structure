import { testSaga } from 'redux-saga-test-plan';
import { equals } from 'ramda';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';
import { sagas } from './sagas';
import { selectors } from './selectors';

describe('loadAccrualsSaga - сага загружает список начислений и кладет в стор', () => {
  test('Должно отработать запрос к API и положить данные в стор', () => {
    const pagination = {
      pageNumber: 1,
      totalItems: 1,
    };
    const number = 1;
    const accruals = [1, 2, 3];
    const totalElements = 1;
    const lastQueryParams = {};
    const queryParams = {};
    const payload = {};
    const isClientSideFilteringEnable = false;
    testSaga(sagas.loadAccrualsSaga, {
      queryParams,
      isClientSideFilteringEnable,
    })
      .next()
      .put(actions.startLoading())
      .next()
      .select(selectors.queryParams)
      .next(lastQueryParams)
      .call(equals, lastQueryParams, queryParams)

      .save('before equals')
      .next(true)
      .put(actions.stopLoading())
      .next()
      .isDone()

      .restore('before equals')
      .next(false)
      .call(callApi, api.getAccruals, [queryParams])
      .next({ accruals, number, totalElements })
      .put(actions.setAccruals(accruals))
      .next()
      .put(actions.setPagination(pagination))
      .next()
      .put(actions.setQueryParams(payload));
  });
});
