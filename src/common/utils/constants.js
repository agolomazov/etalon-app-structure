/**
 * ## Формат даты для преобразования через momentjs.
 * @const
 * @type {string}
 */
export const DATE_FORMAT = 'DD.MM.YYYY';

/**
 * ## Формат даты получаемый от сервера.
 * @const
 * @type {string}
 */
export const SERVER_DATE_FORMAT = 'YYYY-MM-DD';

/**
 * ## Широкий формат даты для преобразования через momentjs.
 * @const
 * @type {object}
 */
export const DATE_WIDE_FORMAT = {
  FORMAT: 'D MMMM YYYY',
  LOCALE: 'ru',
};

/**
 * Формат даты и времени вида 31.01.2020 в 23:33
 */
export const APPEAL_DATE_TIME_FORMAT = 'DD.MM.YYYY [в] HH:mm';

/**
 * Формат месяца и года
 */
export const CALENDAR_MONTH_YEAR_FORMAT = 'MMMM YYYY';

/**
 * Формат дня недели
 */
export const CALENDAR_WEEKDAY_FORMAT = 'dd';
