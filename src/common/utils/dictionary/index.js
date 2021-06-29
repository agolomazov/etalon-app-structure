import { ACCRUAL_PERIOD_TYPES } from '@src/constants';

/**
 * ## Метод возвращает поле name при совпадении code в словаре
 * @example
 * getDictionaryText(dictionary, code, defaultValue);
 *
 * @param {array} dictionary - массив объектов из словаря
 * @param {string} code - значение кода искомого объекта
 * @param {string} defaultValue - значение если код не найден
 * @param {boolean} shouldLower - надо ли понижать регистр
 *
 * @returns {string} значение поле name из словаря
 */
export const getDictionaryText = (
  dictionary,
  code,
  defaultValue = null,
  shouldLower = false,
) => {
  const result = dictionary.find((el) => el.code === code);
  if (result) {
    return shouldLower ? result.name.toLowerCase() : result.name;
  }
  return defaultValue;
};

/**
 * ## Метод возвращает корректный текст сообщения о начислении
 * @example
 * getFullPeriodText(code, dictionary);
 *
 * @param {string} code - значение кода искомого объекта
 * @param {array} dictionary - массив объектов из словаря
 *
 * @returns {string} Сообщение о начислении
 */
export const getFullPeriodText = (code, dictionary) => {
  if (code === null || code === undefined) {
    return 'Начислено';
  }
  if (code === ACCRUAL_PERIOD_TYPES.HALF_YEAR) {
    return `Начислено за текущее ${getDictionaryText(
      dictionary,
      code,
      '',
      true,
    )}`;
  }
  if (code === ACCRUAL_PERIOD_TYPES.ARBITRARY) {
    return `Начислено за текущий период`;
  }
  return `Начислено за текущий ${getDictionaryText(
    dictionary,
    code,
    'период',
    true,
  )}`;
};
