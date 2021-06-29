/**
 * ## Метод для получения класса подсветки элемента списка договоров
 * @example
 * getCardColor(penaltyAmount, debtAmount, overpaymentAmount);
 *
 * @param {string} penaltyAmount - сумма пени
 * @param {string} debtAmount - сумма задолженности
 * @param {string} overpaymentAmount - сумма переплаты
 *
 * @returns {string} возвращает необходимый класс элемента
 */
export const getCardColor = (penaltyAmount, debtAmount, overpaymentAmount) => {
  if (Number(penaltyAmount) !== 0 || Number(debtAmount) !== 0) {
    return 'card-danger';
  }
  if (Number(overpaymentAmount) !== 0 && Number(penaltyAmount) === 0) {
    return 'card-warning';
  }
  return 'card-default';
};
