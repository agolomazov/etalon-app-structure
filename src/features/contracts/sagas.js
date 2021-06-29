import { call, put, all, select } from 'redux-saga/effects';
import { splitEvery, equals } from 'ramda';

import { callApi } from '@common/utils';

import { CONTRACT_IDS_CHUNK_SIZE } from './constants';
import { api } from './api';
import { actions } from './ducks';
import { selectors } from './selectors';
import { selectContracts } from './utils';
/**
 * Сага для загрузки списка договоров
 *
 * @param {object} params - параметры
 * @param {object} params.queryParams - параметры фильтрации, сортировки и пагинации
 * @param {object} params.queryParams.filters - фильтры
 * @param {Array<string>} params.queryParams.filters.contractIds - Идентификаторы договоров
 * @param {string} params.queryParams.filters.contractNumber - Номер договора
 * @param {string} params.queryParams.filters.contractDateFrom - Дата начала договора, с
 * @param {string} params.queryParams.filters.contractDateTo - Дата начала договора, по
 * @param {string} params.queryParams.filters.expirationDateFrom - Дата окончания действия, с
 * @param {string} params.queryParams.filters.expirationDateTo - Дата окончания действия, по
 * @param {string} params.queryParams.filters.address - Адрес
 * @param {string} params.queryParams.filters.typeId - Идентификатор типа
 * @param {string} params.queryParams.filters.statusId - Статус договора
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
function* loadContractsSaga({ isClientSideFilteringEnable, queryParams } = {}) {
  // query-параметры, с которыми был отправлен последний запрос
  const lastQueryParams = yield select(selectors.queryParams);

  // проверяем совподяют ли query-параметры, если нет то отправляем запрос
  const isEqualsQueryParams = yield call(equals, lastQueryParams, queryParams);

  if (!isEqualsQueryParams) {
    // отправляем запрос на бекенд, получаем список договоров
    const {
      content: contracts,
      number: pageNumber,
      totalElements: totalItems,
    } = yield call(callApi, api.getContracts, [queryParams]);

    // сортировка и фильтрация
    const sampledContracts = isClientSideFilteringEnable
      ? selectContracts(contracts, queryParams)
      : contracts;

    // кладем полученные данные в стор
    yield put(actions.setContracts(sampledContracts));
    yield put(actions.setPagination({ pageNumber, totalItems }));

    // кладем query параметры в стор
    yield put(actions.setQueryParams(queryParams));
  }
}

/**
 * Сага для загрузки списка договоров по их идентификаторам
 *
 * @param {Array<number|string>} contractIds - Идентификаторы договоров
 *
 * @returns {Array} список загруженных договоров
 */
function* loadContractsByIdsSaga(contractIds) {
  if (!contractIds || !contractIds.length) {
    return [];
  }

  // разбиваем список Ids договоров на чанки
  const contractIdsChunks = splitEvery(CONTRACT_IDS_CHUNK_SIZE, contractIds);

  // загружаем информацию по договорам
  const contractsChunks = yield all(
    contractIdsChunks.map((ids) =>
      call(
        callApi,
        api.getContracts,
        [{ filters: { contractIds: ids } }],
        ['data', 'content'],
      ),
    ),
  );

  // возвращаем пустой массив, если пустой ответ от сервера
  if (!contractsChunks || contractsChunks.length === 0) {
    return [];
  }

  // объединяем чанки и возвращаем список договоров
  return contractsChunks.reduce(
    (contracts, chunk) =>
      Array.isArray(chunk) ? [...contracts, ...chunk] : contracts,
    [],
  );
}

export const sagas = {
  loadContractsSaga,
  loadContractsByIdsSaga,
};
