import { pluralize } from '@common/utils';
/**
 * ## Метод формирования окончания в дательном у слова "договор" от их количество
 * @example
 * plurolizeContracts(contractCount);
 *
 * @param {string} contractCount - полученое от сервера количество договоров
 *
 * @returns {string} возвращает строку "N договору/договорам"
 */
export const plurolizeContracts = (contractCount) => {
  if (!contractCount) {
    return '';
  }
  return `${contractCount} ${pluralize(
    'договору',
    'договорам',
    'договорам',
  )(contractCount)}`;
};
