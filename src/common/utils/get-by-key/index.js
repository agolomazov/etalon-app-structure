import { pathOr } from 'ramda';

/**
 * Метод генерирует функцию, которая возвращает значение по ключу в объекте
 * @param {Object} hash - Объект ключ-значение
 * @param {any} defaultValue - значение по умолчанию
 *
 * @returns {Function} Функция которая возвращает значение по ключу в объекте
 */
export const getByKey = (hash, defaultValue) => (key) =>
  pathOr(defaultValue, [key], hash);
