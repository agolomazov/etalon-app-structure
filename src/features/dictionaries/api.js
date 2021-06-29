import { tenantContractClient } from '@src/request';

/**
 * ## Загрузить справочники
 *
 * @example
 * getDictionaries();
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const getDictionaries = () => tenantContractClient.get('dictionary-collection');

export const api = {
  getDictionaries,
};
