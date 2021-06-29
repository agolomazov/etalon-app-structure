import { tenantContractClient } from '@src/request';

/**
 * Получение текста согласия на ЭДО
 *
 * @example
 * getConsentToEdmText()
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const getConsentToEdmText = () => tenantContractClient.get('edo-consent');

/**
 * Отправка согласия на ЭДО
 *
 * @example
 * sendConsentToEdm()
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const sendConsentToEdm = () => tenantContractClient.post('edo-consent', {});

export const api = {
  getConsentToEdmText,
  sendConsentToEdm,
};
