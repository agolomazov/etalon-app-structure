import { testSaga } from 'redux-saga-test-plan';
import { equals } from 'ramda';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';
import { selectors } from './selectors';
import { sagas } from './sagas';

describe('loadRentalsSaga - сага загружает список объектов и кладет его в стор', () => {
  test('Сага должна отработать запрос к API и положить данные в стор', () => {
    const rentals = {
      content: [1, 2, 3],
      size: 1,
      number: 1,
      totalElements: 1,
    };
    const queryParams = {};

    testSaga(sagas.loadRentalsSaga, { queryParams })
      .next()
      .put(actions.startLoading())
      .next()
      .select(selectors.queryParams)
      .next(queryParams)
      .call(equals, queryParams, queryParams)

      .save('before equals')
      .next(false)
      .call(callApi, api.getFacilityRental, [queryParams])
      .next(rentals)
      .put(actions.setRentals(rentals.content))
      .next()
      .put(
        actions.setPagination({
          pageNumber: rentals.number,
          totalItems: rentals.totalElements,
        }),
      )
      .next()
      .put(actions.setQueryParams(queryParams))
      .next()
      .put(actions.stopLoading())
      .next()
      .isDone()

      .restore('before equals')
      .next(true)
      .put(actions.stopLoading())
      .next()
      .isDone();
  });

  test('Сага должна фильтровать и сортировать список объектов аренды, если установлен параметр isClientSideFilteringEnable', () => {
    const rentals = {
      content: [
        {
          address: 'Санкт-Петербург',
        },
        {
          address: 'Москва',
        },
      ],
      size: 1,
      number: 1,
      totalElements: 1,
    };
    const queryParams = {
      filters: {
        address: 'Санкт-Петербург',
      },
    };

    testSaga(sagas.loadRentalsSaga, {
      queryParams,
      isClientSideFilteringEnable: true,
    })
      .next()
      .put(actions.startLoading())
      .next()
      .select(selectors.queryParams)
      .next(undefined)
      .call(equals, queryParams, undefined)
      .next(false)
      .call(callApi, api.getFacilityRental, [queryParams])
      .next(rentals)
      .put(actions.setRentals([rentals.content[0]]))
      .next()
      .put(
        actions.setPagination({
          pageNumber: rentals.number,
          totalItems: rentals.totalElements,
        }),
      )
      .next()
      .put(actions.setQueryParams(queryParams))
      .next()
      .put(actions.stopLoading())
      .next()
      .isDone();
  });
});
