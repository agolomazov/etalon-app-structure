import { tenantContractClient } from '@src/request';

/**
 * ## Загрузить список арендодателей
 *
 * @example
 * getLandlords();
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const getLandlords = () => tenantContractClient.get('landlord-collection');

export const api = {
  getLandlords,
};
