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
