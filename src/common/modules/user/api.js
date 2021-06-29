import { tenantContractClient } from '@src/request';

/**
 * Получение данныx пользователя
 *
 * @example
 * getUser()
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const getUser = () => tenantContractClient.get('user');

export const api = {
  getUser,
};
