import { tenantContractClient } from '@src/request';

/**
 * Подписание документов
 *
 * @example
 * signDocuments([1])
 *
 * @param {Array<number>} documentIds - идентификаторы документов
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const signDocuments = (documentIds) =>
  tenantContractClient.post('sign-documents', { documentIds });

export const api = {
  signDocuments,
};
