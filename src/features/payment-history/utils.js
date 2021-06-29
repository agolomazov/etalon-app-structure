import { isDateAfter } from '@common/utils';

/**
 * ## Метод для сортировки по датам в истории платежей
 * @example
 *
 * sortPaymentsByDate(payments);
 *
 * @param {array} payments - массив платежей
 *
 * @returns {array} возвращает отфильтрованный список платежей
 */
export const sortPaymentsByDate = (payments = []) =>
  [...payments].sort((first, second) =>
    isDateAfter(first.receiveDate, second.receiveDate) ? -1 : 1,
  );
