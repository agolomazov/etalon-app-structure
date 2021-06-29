import { isDateAfter } from '@common/utils';

/**
 * ## Метод для сортировки по датам в начислениях
 * @example
 * sortAccrualsByDate(accruals);
 *
 * @param {array} accruals - массив объектов для сортировки
 *
 * @returns {array} возвращает отфильтрованный массив данных
 */
export const sortAccrualsByDate = (accruals = []) => {
  if (accruals === null) {
    return null;
  }
  return [...accruals].sort((ela, elb) => {
    if (isDateAfter(ela.date, elb.date)) {
      return -1;
    }
    if (isDateAfter(ela.date, elb.date)) {
      return 1;
    }
    return 0;
  });
};
