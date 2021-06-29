import { call, put, select } from 'redux-saga/effects';
import { equals } from 'ramda';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';
import { selectors } from './selectors';
import { sortAccrualsByDate } from './utils';

/**
 * Сага загружает начисления по договору
 *
 * @param {object} params - параметры
 * @param {object} params.queryParams - параметры фильтрации, сортировки и пагинации
 * @param {string} params.queryParams.contractId - Id договора
 * @param {object} params.queryParams.sort - сортировка
 * @param {string} params.queryParams.sort.field - Поле, по которому проводится сортировка
 * @param {string} params.queryParams.sort.direction - Направление, по которому проводится сортировка
 * @param {object} params.queryParams.page - пагинация
 * @param {number} params.queryParams.page.number - Номер страницы
 * @param {number} params.queryParams.page.size - Размер страницы
 * @param {boolean} params.isClientSideFilteringEnable - сортировка и фильтрация на стороне клиента
 *
 * @returns {void}
 */
function* loadAccrualsSaga({ queryParams, isClientSideFilteringEnable } = {}) {
  try {
    // показываем loader
    yield put(actions.startLoading());

    // query-параметры, с которыми был отправлен последний запрос
    const lastQueryParams = yield select(selectors.queryParams);

    // проверяем совподяют ли query-параметры, если нет то отправляем запрос
    const isEqualsQueryParams = yield call(
      equals,
      queryParams,
      lastQueryParams,
    );

    if (!isEqualsQueryParams) {
      // отправляем запрос на бекенд, получаем список начислений
      const {
        accruals,
        number: pageNumber,
        totalElements: totalItems,
      } = yield call(callApi, api.getAccruals, [queryParams]);

      // кладем полученные данные в стор
      yield put(
        actions.setAccruals(
          isClientSideFilteringEnable ? sortAccrualsByDate(accruals) : accruals,
        ),
      );
      yield put(actions.setPagination({ pageNumber, totalItems }));

      // кладем query параметры в стор
      yield put(actions.setQueryParams(queryParams));
    }
  } finally {
    // скрываем loader
    yield put(actions.stopLoading());
  }
}

export const sagas = {
  loadAccrualsSaga,
};
