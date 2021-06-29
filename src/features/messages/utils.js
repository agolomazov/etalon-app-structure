import { pathOr } from 'ramda';

import {
  getUserFullName,
  isDateTimeAfter,
  isDateTimeBefore,
} from '@common/utils';

import {
  MESSAGE_DIRECTON_ICONS,
  BACKEND_URL_PREFIX,
  APPEAL_TYPES,
  APPEAL_STATUS,
  INCOMING_DOCUMENT_STATUS,
} from './constants';

/**
 * ## Метод сортировки списка обращений
 * @example
 * setSortMessagesList(appeal);
 *
 * @param {array} appeals - массив со списком обращений
 *
 * @returns {array} отсортированный массив
 */
export const setSortMessagesList = (appeals) => {
  if (appeals.length > 0) {
    return [...appeals].sort((first, second) => {
      if (isDateTimeAfter(first.updated, second.updated)) {
        return -1;
      }
      if (isDateTimeBefore(first.updated, second.updated)) {
        return 1;
      }
      return 0;
    });
  }
  return appeals;
};

/**
 * ## Метод фильтрации списка обращений
 * @example
 * setFilterMessagesList(appeal, searchValue);
 *
 * @param {array} appeal - массив со списком обращений
 * @param {string} searchValue - значение фильтра
 *
 * @returns {array} отфильтраваный массив
 */
export const setFilterMessagesList = (appeal, searchValue) => {
  const sortedList = setSortMessagesList(appeal);
  if (searchValue && searchValue !== '') {
    return sortedList.filter((elm) =>
      elm.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }
  return sortedList;
};

/**
 * ## Метод проверяет является ли обращение Входящим документом требующим подпись
 * @example
 * isDocumentRequireSignature(type);
 *
 * @param {string} type - тип обращения
 *
 * @returns {boolean} ответ true/false
 */
export const isDocumentRequireSignature = (type) =>
  type === APPEAL_TYPES.INCOMING_DOCUMENT_SIGNATURE_REQUIRED;

/**
 * ## Метод проверяет является ли обращение Входящим документом НЕ требующим подпись
 * @example
 * isDocumentNotRequireSignature(type);
 *
 * @param {string} type - тип обращения
 *
 * @returns {boolean} ответ true/false
 */
export const isDocumentNotRequireSignature = (type) =>
  type === APPEAL_TYPES.INCOMING_DOCUMENT_SIGNATURE_NOT_REQUIRED ||
  type ===
    APPEAL_TYPES.INCOMING_DOCUMENT_SIGNATURE_AND_CONFIRMATION_NOT_REQUIRED;

/**
 * ## Метод проверяет является ли обращение "Обращением по ЖС"
 * @example
 * isAppeal(type);
 *
 * @param {string} type - тип обращения
 *
 * @returns {boolean} ответ true/false
 */
export const isAppeal = (type) =>
  Object.values(APPEAL_TYPES).indexOf(type) > -1 &&
  type !== APPEAL_TYPES.INCOMING_DOCUMENT_SIGNATURE_REQUIRED &&
  type !== APPEAL_TYPES.INCOMING_DOCUMENT_SIGNATURE_NOT_REQUIRED &&
  type !==
    APPEAL_TYPES.INCOMING_DOCUMENT_SIGNATURE_AND_CONFIRMATION_NOT_REQUIRED;

/**
 * ## Метод формирует отправителя комментария
 * @example
 * getCommentAuthor(author);
 *
 * @param {object} author - объект с отправителем комментраия, если author.rosim == false,
 * то объекь слжержит объект name с именем пользователя
 *
 * @returns {string} отправитель сообщения
 */
export const getCommentAuthor = (author) => {
  if (author.rosim) {
    return 'Росимущество';
  }
  return getUserFullName(author.name, true);
};

/**
 * ## Метод возвращает класс иконки указывающим входящий или исходящий
 * последнеий комментарий в обращении
 * @example
 * getDirectionIcon(value);
 *
 * @param {string} value - IN / OUT направлеие комментария
 *
 * @returns {string} CSS класс
 */
export const getDirectionIcon = (value) =>
  pathOr(null, [value], MESSAGE_DIRECTON_ICONS);

/**
 * ## Метод убирает лишний префикс у URL полученного от бэкэнда
 * @example
 * fixUrl(url);
 *
 * @param {string} url - URL полученный от бэкэнда
 *
 * @returns {string} - URL без префикса
 */
export const fixUrl = (url) => url.replace(BACKEND_URL_PREFIX, '');

/**
 * ## Метод ищет данные вложения по Id в дополнительных данных по обращению
 * @example
 * getAttachmentDataById(additionalData, id);
 *
 * @param {object} attachments - дополнительные данные обращения,
 * @param {number} id - ID вложения,
 *
 * @returns {object} давнные вложения
 */
export const getAttachmentDataById = (attachments, id) => {
  const result = attachments.find(({ file }) => file.id === id);
  if (result) {
    return result;
  }
  return null;
};

/**
 * ## Метод определяющий какой CSS класс применять к тексту статуса обращения
 * @example
 * getAppealStatusStyle(status);
 *
 * @param {string} status - статус обращения
 * @param {boolean} isText - true если нужен класс для текста, по умолчанию
 * @returns {string} возвращает CSS класса
 */
export const getAppealStatusStyle = (status, isText = true) => {
  switch (status) {
    case APPEAL_STATUS.FINAL_ANSWER:
      return isText ? 'txt-success' : 'success';
    case APPEAL_STATUS.ADDITIONAL_INFO_REQUESTED:
      return isText ? 'txt-warning' : 'warning';
    default:
      return isText ? 'txt-info' : 'info';
  }
};

/**
 * ## Метод определяющий какой CSS класс применять к тексту статуса входящего документа
 * @example
 * getDocumentStatusStyle(status);
 *
 * @param {string} status - статус документа
 * @param {boolean} isText - true если нужен класс для текста, по умолчанию
 * @returns {string} возвращает CSS класса
 */
export const getDocumentStatusStyle = (status, isText = true) => {
  switch (status) {
    case INCOMING_DOCUMENT_STATUS.SIGNED:
    case INCOMING_DOCUMENT_STATUS.REJECTED:
      return isText ? 'txt-success' : 'success';
    case INCOMING_DOCUMENT_STATUS.SIGN_REQUESTED:
      return isText ? 'txt-warning' : 'warning';
    default:
      return isText ? 'txt-info' : 'info';
  }
};

/**
 * # Метод определяющий какой CSS класс применять к статусу входящего документа или обращения
 * на основании типа сообщения и его статуса
 * @example
 * getStatusStyle(status);
 *
 * @param {string} type - тип сообщения
 * @param {string} status - статус сообщения
 * @param {boolean} isText - true если нужен класс для текста, по умолчанию
 * @returns {string} возвращает CSS класса
 */
export const getStatusStyle = (type, status, isText = true) => {
  if (!isAppeal(type)) {
    return getDocumentStatusStyle(status, isText);
  }
  return getAppealStatusStyle(status, isText);
};

/**
 * # Метод преобразует оценку пользователя в серверный формат и обратно
 * @example
 * convertFeedback('ONE_POINT');
 *
 * @param {string|number} feedback - оценка пользователя
 *
 * @returns {string|number} возвращает преобразованную оценку
 */
export const convertFeedback = (feedback) => {
  switch (feedback) {
    case 1:
      return 'ONE_POINT';
    case 2:
      return 'TWO_POINTS';
    case 3:
      return 'THREE_POINTS';
    case 4:
      return 'FOUR_POINTS';
    case 5:
      return 'FIVE_POINTS';
    case 'ONE_POINT':
      return 1;
    case 'TWO_POINTS':
      return 2;
    case 'THREE_POINTS':
      return 3;
    case 'FOUR_POINTS':
      return 4;
    case 'FIVE_POINTS':
      return 5;
    default:
      return null;
  }
};
