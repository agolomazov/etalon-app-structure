import moment from 'moment';
import {
  DATE_FORMAT,
  DATE_WIDE_FORMAT,
  SERVER_DATE_FORMAT,
  APPEAL_DATE_TIME_FORMAT,
  CALENDAR_MONTH_YEAR_FORMAT,
  CALENDAR_WEEKDAY_FORMAT,
} from '../constants';

/**
 * Метод преобразет дату полученую от сервера в читаемый единый формат
 * @example setDateFormat(date);
 *
 * @param {string} date - значие полученое от сервера
 *
 * @returns {string} отформатированная дата
 */
export const setDateFormat = (date) => moment(date).format(DATE_FORMAT);

/**
 * Метод преобразет дату в формате ДД.ММ.ГГГГ в серверный формат
 * @example setServerDateFormat(date);
 *
 * @param {string} date - дата в формате ДД.ММ.ГГГГ
 *
 * @returns {string} отформатированная дата
 */
export const setServerDateFormat = (date) =>
  moment(date, DATE_FORMAT).format(SERVER_DATE_FORMAT);

/**
 * Метод преобразет дату в серверный формат
 * @example setDateToServerDateFormat(new Date());
 *
 * @param {Date} date - дата
 *
 * @returns {string} отформатированная дата
 */
export const setDateToServerDateFormat = (date) =>
  moment(date).format(SERVER_DATE_FORMAT);

/**
 * Метод преобразет дату в серверном формате в Date объект
 * @example getDateObject(date);
 *
 * @param {Date} date - дата в серверном формате
 *
 * @returns {Date} объект Date
 */
export const getDateObject = (date) =>
  moment(date, SERVER_DATE_FORMAT).toDate();

/**
 * ## Метод для преобразования даты ДД.ММ.ГГГГ в объект momentjs
 * @example
 * getMomentDateObject(date);
 *
 * @param {string} date - дата в любом формате
 *
 * @returns {object} momentjs объект
 */
const getMomentDateObject = (date) => moment(date, DATE_FORMAT);

/**
 * Метод проверяет если первая дата позже второй
 * @example isDateAfter(firstDate, secondDate);
 *
 * @param {string} firstDate - первая дата для сравнения
 * @param {string} secondDate - вторая дата для сравнения
 *
 * @returns {boolean} результат сравнения
 */
export const isDateAfter = (firstDate, secondDate) =>
  moment(firstDate, SERVER_DATE_FORMAT).isAfter(
    moment(secondDate, SERVER_DATE_FORMAT),
  );

/**
 * Метод проверяет если первая дата и время позже второй
 * @example isDateTimeAfter(firstDate, secondDate);
 *
 * @param {string} firstDate - первая дата для сравнения
 * @param {string} secondDate - вторая дата для сравнения
 *
 * @returns {boolean} результат сравнения
 */
export const isDateTimeAfter = (firstDate, secondDate) =>
  moment(firstDate).isAfter(moment(secondDate));

/**
 * Метод проверяет если первая дата позже или равна второй
 * @example isDateSameOrAfter(firstDate, secondDate);
 *
 * @param {string} firstDate - первая дата в формате "YYYY-MM-DD" для сравнения
 * @param {string} secondDate - вторая дата в формате "DD.MM.YYYY" для сравнения
 *
 * @returns {boolean} результат сравнения
 */
export const isDateSameOrAfter = (firstDate, secondDate) =>
  moment(firstDate, SERVER_DATE_FORMAT).isSameOrAfter(
    getMomentDateObject(secondDate),
  );

/**
 * Метод проверяет если первая дата раньше второй
 * @example isDateAfter(firstDate, secondDate);
 *
 * @param {string} firstDate - первая дата для сравнения
 * @param {string} secondDate - вторая дата для сравнения
 *
 * @returns {boolean} результат сравнения
 */
export const isDateBefore = (firstDate, secondDate) =>
  moment(firstDate, SERVER_DATE_FORMAT).isBefore(
    moment(secondDate, SERVER_DATE_FORMAT),
  );

/**
 * Метод проверяет если первая дата и время раньше второй
 * @example isDateTimeBefore(firstDate, secondDate);
 *
 * @param {string} firstDate - первая дата для сравнения
 * @param {string} secondDate - вторая дата для сравнения
 *
 * @returns {boolean} результат сравнения
 */
export const isDateTimeBefore = (firstDate, secondDate) =>
  moment(firstDate).isBefore(moment(secondDate));

/**
 * Метод проверяет если первая дата раньше или равна второй
 * @example isDateSameOrBefore(firstDate, secondDate);
 *
 * @param {string} firstDate - первая дата в формате "YYYY-MM-DD" для сравнения
 * @param {string} secondDate - вторая дата в формате "DD.MM.YYYY" для сравнения
 *
 * @returns {boolean} результат сравнения
 */
export const isDateSameOrBefore = (firstDate, secondDate) =>
  moment(firstDate, SERVER_DATE_FORMAT).isSameOrBefore(
    getMomentDateObject(secondDate),
  );

/**
 * Метод проверяет если дата находится в диапазоне
 * @example isDateBetween(date, startDate, endDate);
 *
 * @param {string} date - дата в формате "YYYY-MM-DD" для сравнения
 * @param {string} startDate - начало диапазона в формате "DD.MM.YYYY" для сравнения
 * @param {string} endDate - конец диапазона в формате "DD.MM.YYYY" для сравнения
 *
 * @returns {boolean} результат сравнения
 */
export const isDateBetween = (date, startDate, endDate) =>
  moment(date, SERVER_DATE_FORMAT).isBetween(
    getMomentDateObject(startDate),
    getMomentDateObject(endDate),
    undefined,
    '[]',
  );

/**
 * Метод проверяет если диапазон дат находится в диапазоне
 * @example isDateRangeBetween(date, startDate, endDate);
 *
 * @param {string} firstDate - начало периода входящего в диапазон  в формате "YYYY-MM-DD"
 * @param {string} secondDate - конец периода входящего в диапазон в формате "YYYY-MM-DD"
 * @param {string} startDate - начало диапазона в формате "DD.MM.YYYY" для сравнения
 * @param {string} endDate - конец диапазона в формате "DD.MM.YYYY" для сравнения
 *
 * @returns {boolean} результат сравнения
 */
export const isDateRangeBetween = (firstDate, secondDate, startDate, endDate) =>
  moment(firstDate, SERVER_DATE_FORMAT).isBetween(
    getMomentDateObject(startDate),
    getMomentDateObject(endDate),
    undefined,
    '[]',
  ) &&
  moment(secondDate, SERVER_DATE_FORMAT).isBetween(
    getMomentDateObject(startDate),
    getMomentDateObject(endDate),
    undefined,
    '[]',
  );

/**
 * Метод преобразет дату в формат "01 января 2020"
 * @example setDateWideFormat(date);
 * @param {string} date - дата
 *
 * @returns {string} отформатированная дата
 */
export const setDateWideFormat = (date) =>
  moment(date).locale(DATE_WIDE_FORMAT.LOCALE).format(DATE_WIDE_FORMAT.FORMAT);

/**
 * Метод преобразет даты в строку "С... по...""
 * @example
 * getFromToDate(startDate, endDate);
 *
 * @param {string} startDate - дата начала периода
 *
 * @param {string} endDate - дата конца периода
 *
 *
 * @returns {string} отформатированная строка с датами
 */
export const getFromToDate = (startDate, endDate) =>
  `${startDate ? `с ${moment(startDate).format(DATE_FORMAT)} ` : ''}${
    endDate ? `по ${moment(endDate).format(DATE_FORMAT)}` : ''
  }`;

/**
 * ## Метод преобразует дату и время полученные от сервера в читаемый формат
 * @example
 * getDateTime(dateTime);
 *
 * @param {string} dateTime - дата и время в серверном формате
 *
 * @returns {string} дата и время в читаемом формате
 */
export const getDateTime = (dateTime) =>
  moment(dateTime).format(APPEAL_DATE_TIME_FORMAT);

/**
 * ## Метод возвращает первый день месяца от заданной даты
 * @example
 * getMonthStartDay(date);
 *
 * @param {string} date - дата
 *
 * @returns {Date} начало месяца
 */
export const getMonthStartDay = (date) =>
  moment(date).startOf('month').toDate();

/**
 * ## Метод возвращает отформатированные месяц и год
 * @example
 * setCalendarMonthYearFormat(date);
 *
 * @param {string} date - дата
 *
 * @returns {string} отформатированные месяц и год
 */
export const setCalendarMonthYearFormat = (date) =>
  moment(date).format(CALENDAR_MONTH_YEAR_FORMAT);

/**
 * ## Метод возвращает отформатированный день недели
 * @example
 * setCalendarShortWeekdayFormat(date);
 *
 * @param {string} date - дата
 *
 * @returns {string} отформатированный день недели
 */
export const setCalendarShortWeekdayFormat = (date) =>
  moment(date).format(CALENDAR_WEEKDAY_FORMAT);
