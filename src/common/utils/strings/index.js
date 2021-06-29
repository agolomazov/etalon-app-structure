import { compose, toUpper, head, tail, toLower } from 'ramda';
import { v4 } from 'uuid';

/**
 * ## Метод преобразования первого символа строки в верхний регистр
 *
 * @example
 * // Строковая переменная с тестовой строкой
 * const str = 'тестовая строка';
 * // Преобразуем первый символ в верхний регистр
 * const newStr = toCapitalize(str); // Тестовая строка
 *
 * @param {string} str - Преобразуемая строка
 *
 * @returns {string} Строка с преобразованными первым символом
 */
export const toCapitalize = compose(
  ({ firstLetter, tailString }) =>
    `${toUpper(firstLetter)}${toLower(tailString)}`,
  (_) => ({ firstLetter: head(_), tailString: tail(_) }),
);

/**
 * ## Метод генерации guid
 * @returns {string} guid
 */
export const uuid4 = () => v4().split('-').join('');

/**
 * Метод переводит массив байт в base64
 *
 * @param {Array<number>} arrayBytes - Массив байт
 *
 * @returns {string} - Строка в base64
 */
export const base64FromArray = (arrayBytes) =>
  String.fromCharCode.apply(null, arrayBytes);

/**
 * Метод принимает размер файла в байтах и переводит его в мегабайты возвращает строку вида "Х мб"
 * @example byteToMegabyte(value)
 * @param {number} value - размер в байтах
 *
 * @returns {string} - строка вида "Х мб"
 */
export const byteToMegabyte = (value) => `${Math.round(value / 1e6)} мб`;
