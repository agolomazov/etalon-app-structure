import { tenantContractClient } from '@src/request';

/**
 * ## Метод получения данных о договоре
 * @example
 * getContractInfo(id);
 *
 * @param {string} id - id договора
 *
 * @returns {AxiosPromise<any>} ответ сервера
 */
const getContractInfo = (id) => tenantContractClient.get(`contract/${id}`);

/**
 * ## Метод формирования квитанции по договору
 * @example
 * getContractReceipt(id);
 *
 * @param {string} id - id договора
 *
 * @returns {AxiosPromise<any>} ответ сервера
 */
const getContractReceipt = (id) =>
  tenantContractClient.post(
    'receipt/form',
    { contractIds: [id] },
    { responseType: 'blob' },
  );

/**
 * ## Метод формирования 1c выгрузки по договору
 * @example
 * getContract1c(id);
 *
 * @param {string} id - id договора
 *
 * @returns {AxiosPromise<any>} ответ сервера
 */
const getContract1c = (id) =>
  tenantContractClient.post(
    '1c/form',
    { contractIds: [id] },
    { responseType: 'blob' },
  );

export const api = {
  getContractInfo,
  getContractReceipt,
  getContract1c,
};
