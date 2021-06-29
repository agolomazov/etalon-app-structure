/**
 * Функция создает генератор целых чисел
 *
 * @example
 * const genId = createNumericGenerator();
 * genId()  // 1
 * genId()  // 2
 *
 * @param {number} startNumber - начальное значение генератора
 *
 * @returns {Function} генератор целых чисел
 */
export const createNumericGenerator = (startNumber = 1) => {
  let number = startNumber;
  // eslint-disable-next-line no-plusplus
  return () => number++;
};
