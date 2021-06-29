import moment from 'moment';
import { SERVER_DATE_FORMAT, DATE_FORMAT } from '@support/common/constants';
import { formatServerDateToDisplayDate } from '@support/common/utils';

/**
 * Формирует дипазон дат
 *
 * @param {string} startDate - дата в формате "YYYY-MM-DD"
 * @param {string} expirationDate - дата в формате "YYYY-MM-DD"
 *
 * @returns {Array<string>} - формирует массив с 2мя датами в формате "DD.MM.YYYY"
 */
export const makeDatePeriod = (startDate, expirationDate) => {
  const now = moment();
  const expiration = moment(expirationDate, SERVER_DATE_FORMAT);
  const start = formatServerDateToDisplayDate(startDate);

  const end = (now.isSameOrBefore(expiration) ? now : expiration).format(
    DATE_FORMAT,
  );

  return [start, end];
};
