/**
 * ## Метод для очистки адреса для лучшей сортировки
 * @example
 * addressFormat(address);
 *
 * @param {string} address - адрес объекта полученый от сервера
 *
 * @returns {string} адрес нижнем регистром и без пробелов
 */
export const addressFormat = (address = '') =>
  address.toLowerCase().replace(/\s+/g, '');
