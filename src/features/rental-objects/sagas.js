import { call, put, select } from 'redux-saga/effects';
import { equals } from 'ramda';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';
import { selectors } from './selectors';
import { selectRentals } from './utils';

/**
 * Сага загружает список объектов аренды
 *
 * @param {object} params - параметры
 * @param {object} params.queryParams - параметры фильтрации, сортировки и пагинации
 * @param {object} params.queryParams.filters - фильтры
 * @param {string} params.queryParams.filters.contractId - Id договора
 * @param {string} params.queryParams.filters.contractNumber - Номер договора
 * @param {string} params.queryParams.filters.contractDateFrom - Дата договора с, в серверном формате
 * @param {string} params.queryParams.filters.contractDateTo - Дата договора по, в серверном формате
 * @param {string} params.queryParams.filters.address - Адрес
 * @param {string} params.queryParams.filters.typeId - Идентификатор типа
 * @param {string} params.queryParams.filters.cadastralNumber - Кадастровый номер
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
function* loadRentalsSaga({ queryParams, isClientSideFilteringEnable } = {}) {
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
      // отправляем запрос на бекенд, получаем список объектов аренды
      const {
        content: rentals,
        number: pageNumber,
        totalElements: totalItems,
      } = yield call(callApi, api.getFacilityRental, [queryParams]);

      // сортировка и фильтрация
      const sampledRentals = isClientSideFilteringEnable
        ? selectRentals(rentals, queryParams)
        : rentals;

      // кладем полученные данные в стор
      yield put(actions.setRentals(sampledRentals));
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
  loadRentalsSaga,
};
