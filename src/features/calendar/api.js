import { tenantContractClient } from '@src/request';

/**
 * Получение информации о календаре оплат Арендатора
 *
 * @param {object} params - параметры
 * @param {string} params.accrualEndDateFrom - Дата, до которой должен быть произведен платеж. Значение, c
 * @param {string} params.accrualEndDateTo - Дата, до которой должен быть произведен платеж. Значение, по
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const getPaymentCalendarWidget = ({ accrualEndDateFrom, accrualEndDateTo }) =>
  tenantContractClient.get('widget/payment-calendar', {
    params: { accrualEndDateFrom, accrualEndDateTo },
  });

export const api = {
  getPaymentCalendarWidget,
};
