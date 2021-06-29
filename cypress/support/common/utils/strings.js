/**
 * ## Метод проверяет является ли значение строкой и убирает лишние пробелы
 * @example
 * removeExtraSpaces(value);
 *
 * @param {any} value - значение на проверку
 *
 * @returns {any} очищенная от лишних пробелов строка, если string или оригинальное значение
 */
export const removeExtraSpaces = (value) =>
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : value;
