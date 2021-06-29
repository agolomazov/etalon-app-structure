import { tenantContractClient } from '@src/request';

/**
 * ## Отклонить документ
 *
 * @example
 * rejectIncomingDocument(appealId);
 *
 * @param {string} appealId - идентификатор документа
 * @param {string} comment - комментарий к отклонению
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const rejectIncomingDocument = (appealId, comment) =>
  tenantContractClient.post(`incoming-document/${appealId}/reject`, {
    comment,
  });

/**
 * ## Получить список входящих документов требующих подтверждение получение
 *
 * @example
 * getIncomingDocumentRequiredConfirmation();
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const getIncomingDocumentRequiredConfirmation = () =>
  tenantContractClient.get('appeal-collection', {
    params: { requiredReceiptConfirmation: true },
  });

/**
 * ## Подтвердить получение входящего документа
 *
 * @example
 * confirmReceiptIncomingDocument(appealId);
 *
 * @param {string} appealId - идентификатор документа
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const confirmReceiptIncomingDocument = (appealId) =>
  tenantContractClient.post(
    `incoming-document/${appealId}/confirm-receipt`,
    {},
  );

export const api = {
  rejectIncomingDocument,
  getIncomingDocumentRequiredConfirmation,
  confirmReceiptIncomingDocument,
};
