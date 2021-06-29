import moment from 'moment';
import { DATE_FORMAT, SERVER_DATE_FORMAT, setDateFormat } from '@common/utils';

/**
 * Генератор названия формы
 *
 * @param {number|string} appealId - id обращения
 *
 * @returns {string} название формы
 */
export const genFormName = (appealId) => `form${appealId}`;

/**
 * Формирует дипазон дат
 *
 * @param {string} startDate - дата в формате "YYYY-MM-DD"
 * @param {string} expirationDate - дата в формате "YYYY-MM-DD"
 *
 * @returns {Array<string>} - формирует массив с 2мя датами в формате "DD.MM.YYYY"
 */
export const makeDatePeriod = (startDate = '', expirationDate = '') => {
  const now = moment();
  const expiration = expirationDate
    ? moment(expirationDate, SERVER_DATE_FORMAT)
    : now;
  const start = startDate ? setDateFormat(startDate) : '';
  const end = (now.isSameOrBefore(expiration) ? now : expiration).format(
    DATE_FORMAT,
  );

  return [start, end];
};

/**
 * Формирует массив с минимальной и максимальной датой
 *
 * @param {string} startDate - дата в формате "YYYY-MM-DD"
 * @param {string} expirationDate - дата в формате "YYYY-MM-DD"
 *
 * @returns {Array<Date|null>} - формирует массив с 2мя датами
 */
export const makeMinMaxDates = (startDate = '', expirationDate = '') => {
  const [start, end] = makeDatePeriod(startDate, expirationDate);

  return [
    start ? moment(start, DATE_FORMAT).toDate() : null,
    end ? moment(end, DATE_FORMAT).toDate() : null,
  ];
};
