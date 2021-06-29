import { testSaga } from 'redux-saga-test-plan';
import { equals } from 'ramda';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';
import { sagas } from './sagas';
import { selectors } from './selectors';

describe('loadPaymentHistorySaga - сага загружает список платежей и кладет в стор', () => {
  test('Должно отработать запрос к API и положить данные в стор', () => {
    const pagination = {
      pageNumber: 1,
      totalItems: 1,
    };
    const number = 1;
    const paymentHistory = [1, 2, 3];
    const totalElements = 1;
    const lastQueryParams = {};
    const queryParams = {};
    const payload = {};
    const isClientSideFilteringEnable = false;
    testSaga(sagas.loadPaymentHistorySaga, {
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
      .call(callApi, api.getPaymentHistory, [queryParams])
      .next({ paymentHistory, number, totalElements })
      .put(actions.setPayments(paymentHistory))
      .next()
      .put(actions.setPagination(pagination))
      .next()
      .put(actions.setQueryParams(payload));
  });
});
