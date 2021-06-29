import { tenantContractClient } from '@src/request';

/**
 * Получение параметров приложения из СУП
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const getAppSettings = () => tenantContractClient.get('settings');

export const api = {
  getAppSettings,
};
