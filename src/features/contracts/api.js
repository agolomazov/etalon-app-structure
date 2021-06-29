import qs from 'qs';
import { tenantContractClient } from '@src/request';

/**
 * ## Метод получения списка договоров
 * @example
 *
 * getContracts();
 *
 * @param {object} params - параметры
 * @param {object} params.filters - фильтры
 * @param {Array<string>} params.filters.contractIds - Идентификаторы договоров
 * @param {string} params.filters.contractNumber - Номер договора
 * @param {string} params.filters.contractDateFrom - Дата начала договора, с
 * @param {string} params.filters.contractDateTo - Дата начала договора, по
 * @param {string} params.filters.expirationDateFrom - Дата окончания действия, с
 * @param {string} params.filters.expirationDateTo - Дата окончания действия, по
 * @param {string} params.filters.address - Адрес
 * @param {string} params.filters.typeId - Идентификатор типа
 * @param {string} params.filters.statusId - Статус договора
 * @param {object} params.sort - сортировка
 * @param {string} params.sort.field - Поле, по которому проводится сортировка
 * @param {string} params.sort.direction - Направление, по которому проводится сортировка
 * @param {object} params.page - пагинация
 * @param {number} params.page.number - Номер страницы
 * @param {number} params.page.size - Размер страницы
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const getContracts = ({
  filters: {
    contractIds,
    contractNumber,
    contractDateFrom,
    contractDateTo,
    expirationDateFrom,
    expirationDateTo,
    address,
    typeId,
    statusId,
  } = {},
  sort: { field, direction } = {},
  page: { number, size } = {},
} = {}) => {
  const params = {
    contractIds,
    contractNumber,
    contractDateFrom,
    contractDateTo,
    expirationDateFrom,
    expirationDateTo,
    address,
    typeId,
    statusId,
    sortField: field,
    sortDirection: direction,
    page: number,
    size,
  };

  return tenantContractClient.get('contract', {
    params,
    paramsSerializer: (queryParams) =>
      qs.stringify(queryParams, { arrayFormat: 'indices' }),
  });
};

export const api = {
  getContracts,
};
