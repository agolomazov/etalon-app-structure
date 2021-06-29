import moment from 'moment';

import { DATE_FORMAT } from '@support/common/constants';

/**
 * Метод преобразует дату полученную от сервера в ui формат
 *
 * @param {string} serverDate - дата в формате YYYY-MM-DD
 *
 * @returns {string} дата в формате DD.MM.YYYY
 */
export const formatServerDateToDisplayDate = (serverDate) =>
  moment(serverDate).format(DATE_FORMAT);

/**
 * Метод преобразует дату полученную от сервера в ui формат и прибавляет/убавляет к ней годы
 *
 * @param {string} serverDate - дата в формате YYYY-MM-DD
 * @param {number} years - количество лет который прибавляем/убавляем
 *
 * @returns {string} дата в формате DD.MM.YYYY
 */
export const addYearsAndFormatServerDate = (serverDate, years) =>
  moment(serverDate).add(years, 'years').format(DATE_FORMAT);

/**
 * Метод формирует текущее число в формате DD.MM.YYYY
 *
 * @returns {string} дата в формате DD.MM.YYYY
 */
export const getToday = () => moment().format(DATE_FORMAT);
