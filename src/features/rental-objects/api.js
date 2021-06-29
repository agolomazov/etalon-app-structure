import { tenantContractClient } from '@src/request';

/**
 * Получение списка объектов аренды
 *
 * @param {object} params - параметры
 * @param {object} params.filters - фильтры
 * @param {string} params.filters.contractId - Id договора
 * @param {string} params.filters.contractNumber - Номер договора
 * @param {string} params.filters.contractDateFrom - Дата договора с
 * @param {string} params.filters.contractDateTo - Дата договора по
 * @param {string} params.filters.address - Адрес
 * @param {string} params.filters.typeId - Идентификатор типа
 * @param {string} params.filters.cadastralNumber - Кадастровый номер
 * @param {object} params.sort - сортировка
 * @param {string} params.sort.field - Поле, по которому проводится сортировка
 * @param {string} params.sort.direction - Направление, по которому проводится сортировка
 * @param {object} params.page - пагинация
 * @param {number} params.page.number - Номер страницы
 * @param {number} params.page.size - Размер страницы
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const getFacilityRental = ({
  filters: {
    contractId,
    contractNumber,
    contractDateFrom,
    contractDateTo,
    address,
    typeId,
    cadastralNumber,
  } = {},
  sort: { field, direction } = {},
  page: { number, size } = {},
} = {}) => {
  const params = {
    contractId,
    contractNumber,
    contractDateFrom,
    contractDateTo,
    address,
    typeId,
    cadastralNumber,
    sortField: field,
    sortDirection: direction,
    page: number,
    size,
  };

  return tenantContractClient.get('facility-rental', { params });
};

/**
 * ## Метод получения списка ообъектов по договору
 * @example
 * getFacilityRentalByContract(id);
 *
 * @param {string} id - id договора
 *
 * @returns {array} список объектов
 */
const getFacilityRentalByContract = (id) =>
  tenantContractClient.get('facility-rental', { params: { contractId: id } });

/**
 * ## Метод получения счетчика недостающих данных по всем объектам договора
 * @example
 * getMissingFacilityRentalData(id);
 *
 * @param {string} id - id договора
 *
 * @returns {object} счетчик недостающих данных
 */
const getMissingFacilityRentalData = (id) =>
  tenantContractClient.get(`contract/${id}/missing-facility-data`);

export const api = {
  getFacilityRental,
  getFacilityRentalByContract,
  getMissingFacilityRentalData,
};
