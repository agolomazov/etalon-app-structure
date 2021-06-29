import { tenantContractClient } from '@src/request';

/**
 * ## Метод получения списка обращений
 * @example
 * getAppeals();
 *
 * @returns {array} список обращений
 */
const getAppeals = () => tenantContractClient.get(`appeal-collection`);

/**
 * ## Метод получения списка обращений
 * @example
 * getAppealsByContract(id);
 *
 * @param {string} id - id договора
 *
 * @returns {array} список обращений
 */
const getAppealsByContract = (id) =>
  tenantContractClient.get(`appeal-collection`, { params: { contractId: id } });

/**
 * ## Метод получения обращения
 * @example
 * getAppeal(url);
 *
 *  @param {string} url - адрес эндпоинта полученый от бэкэнда
 *
 * @returns {object} информация по обращению
 */
const getAppeal = (url) => tenantContractClient.get(url);

/**
 * ## Метод получения комментариев к обращению
 * @example
 * getAppealComments(id);
 *
 *  @param {string} id - id обращения
 *
 * @returns {object} список комментариев к обращению
 */
const getAppealComments = (id) =>
  tenantContractClient.get(`appeal/${id}/comment`);

/**
 * ## Метод отправки оценки помощи по обращению
 * @example
 * setAppealFeedback(feedback);
 *
 * @param {object} feedback - {id - обращения,
 *  rate - оценка пользователя,
 *  comment - коментарий к оценке}
 *
 * @returns {object} ответ сервера
 */
const setAppealFeedback = (feedback) => {
  const { appealId, rate, comment } = feedback;
  return tenantContractClient.post(`appeal/${appealId}/feedback`, {
    rate,
    comment,
  });
};

/**
 * ## Метод отметки комментария прочитанным
 * @example
 * setAppealCommentRead(id);
 *
 * @param {string} id - id обращения
 *
 * @returns {object} ответ сервера
 */
const setAppealCommentRead = (id) =>
  tenantContractClient.put(`appeal/${id}/read`, {});

/**
 * ## Метод добавления комментария
 * @example
 * setAppealComment(id);
 *
 * @param {object} comment - {body: текст комментария,
 * attachments: [{file: документ, fileName: имя документа}]}
 *
 * @returns {object} ответ сервера
 */
const setAppealComment = (comment) => {
  const { appealId, body, attachments } = comment;
  return tenantContractClient.post(`appeal/${appealId}/comment`, {
    body,
    attachments,
  });
};

export const api = {
  getAppeals,
  getAppeal,
  getAppealComments,
  setAppealFeedback,
  setAppealCommentRead,
  setAppealComment,
  getAppealsByContract,
};
