import { tenantContractClient } from '@src/request';

/**
 * Получение истории платежей по договору
 *
 * @param {object} params - параметры
 * @param {string} params.contractId - Id договора
 * @param {object} params.sort - сортировка
 * @param {string} params.sort.field - Поле, по которому проводится сортировка
 * @param {string} params.sort.direction - Направление, по которому проводится сортировка
 * @param {object} params.page - пагинация
 * @param {number} params.page.number - Номер страницы
 * @param {number} params.page.size - Размер страницы
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const getPaymentHistory = ({
  contractId,
  sort: { field, direction } = {},
  page: { number, size } = {},
} = {}) => {
  const params = {
    sortField: field,
    sortDirection: direction,
    page: number,
    size,
  };

  return tenantContractClient.get(`contract/${contractId}/payment-history`, {
    params,
  });
};

export const api = {
  getPaymentHistory,
};
