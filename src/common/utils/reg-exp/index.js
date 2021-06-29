/* eslint-disable camelcase */
/**
 * Метод для генерации регулярного выражения для проверки валидации пароля
 *
 * @example
 * const patterns = {
 *    'numeric':     '0-9',
 *    'special':     '!@#$%^&*',
 *    'latin_lower': 'a-z',
 *    'latin_upper': 'A-Z'
 * };
 *  const min = 6;
 *  makePasswordRegExp(patterns, min);
 *
 * Вывод:
 * /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{6,}/g
 *
 * @param {object} patterns - объект с шаблонами символов
 * @param {number} min - минимальное число символов
 * @param {number} max - максимальное число символов
 *
 * @returns {regex_string} new RegExp - регулярное выражение
 */
export const createPasswordValidateRegExp = (patterns, min = '', max = '') => {
  let regex_string = '';

  // Разрешённый диапазон для длины строки
  const range = `{${min},${max}}`;
  let rules = [];
  Object.keys(patterns).map((rule) => {
    // Запоминаем правила
    rules = [...rules, patterns[rule]];

    /*
     * Формируем последовательность из шаблонов `(?=.*[%s])`
     * Она проверит обязательное присутствие всех символов из входящего набора
     */
    regex_string += `(?=.*[${patterns[rule]}])`;
    return true;
  });

  /*
   * Добавляем в хвост набор из ВСЕХ разрешённых
   * символов и разрешённую длину строки
   */
  regex_string += `^[${rules.join('')}]${range}$`;

  // Собираем всё в одно регулярное выражение
  return new RegExp(regex_string, 'g');
};
