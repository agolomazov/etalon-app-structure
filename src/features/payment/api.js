import { tenantContractClient } from '@src/request';

import { upsMock } from './mock';

/**
 * Получить данные для промежуточной страницы оплаты
 *
 * @example
 * getPaymentAccruals('1')
 *
 * @param {string} contractId - идентификатор договора
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const getPaymentAccruals = (contractId) =>
  tenantContractClient.get(`contract/${contractId}/payment`);

/**
 * Отправить запрос check_pay для ЕПС
 *
 * @example
 * check_pay({ step: '0'});
 *
 * @param {object} order - услуга ЕПС
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const checkPayForUpsOrder = (order) => upsMock(order);

export const api = {
  getPaymentAccruals,
  checkPayForUpsOrder,
};
