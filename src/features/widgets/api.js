import { tenantContractClient } from '@src/request';

/**
 * Получение данных виджета
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const getPaymentWidgetData = () => tenantContractClient.get('widget/payment');

/**
 * Получение данных виджета входящих документов
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const getIncomingDocumentsWidgetData = () =>
  tenantContractClient.get('widget/incoming-documents');

export const api = {
  getPaymentWidgetData,
  getIncomingDocumentsWidgetData,
};
