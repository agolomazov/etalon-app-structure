import { tenantContractClient } from '@src/request';

/**
 * ## Метод скачивание Руководства пользователя
 * @example
 * getUserManual();
 *
 * @returns {AxiosPromise<any>} ответ сервера
 */
const getUserManual = () =>
  tenantContractClient.get('tech-support/manual', { responseType: 'blob' });

/**
 * ## Метод отправки отзыва о работе личного кабинета арендатора
 * @example
 * sendFeedbackMessage({ subjectType, text, email, attachment });
 *
 * @param {object} params - входные параметры
 * @param {string} params.subjectType - тема сообщения
 * @param {string} params.text - текст сообщения
 * @param {string} params.email - email
 * @param {object} params.attachment - данные вложения
 * @param {string} params.attachment.file - файл в формате base64
 * @param {string} params.attachment.fileName - имя файла
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const sendFeedbackMessage = ({ subjectType, text, email, attachment }) =>
  tenantContractClient.post(`feedback`, {
    subjectType,
    text,
    email,
    attachment,
  });

/**
 * ## Метод отправки обращения в техническую поддержку
 * @example
 * sendTechSupportMessage({ subject, text, email, attachment });
 *
 * @param {object} params - входные параметры
 * @param {string} params.subjectType - тема сообщения
 * @param {string} params.text - текст сообщения
 * @param {string} params.email - email
 * @param {object} params.attachment - данные вложения
 * @param {string} params.attachment.file - файл в формате base64
 * @param {string} params.attachment.fileName - имя файла
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const sendTechSupportMessage = ({ subject, text, email, attachment }) =>
  tenantContractClient.post(`tech-support`, {
    subject,
    text,
    email,
    attachment,
  });

export const api = {
  getUserManual,
  sendFeedbackMessage,
  sendTechSupportMessage,
};
