import { useSelector } from 'react-redux';

import { selectors } from '../selectors';

/**
 * @typedef {object} DictionariesSelectorHook
 * @property {Array} contractTypes - справочник "Тип договора"
 * @property {Array} contractStatuses - справочник "Статус договора"
 * @property {Array} tenantTypes - справочник "Тип Арендатора"
 * @property {Array} facilityRentalTypes - справочник "Тип объекта аренды"
 * @property {Array} accrualTypes - справочник "Тип начисления"
 * @property {Array} accrualPeriods - справочник "Период начисления арендной платы"
 */
/**
 * Хук возвращает справочники
 * @returns {DictionariesSelectorHook} результат
 */
export const useDictionariesSelector = () => {
  const contractTypes = useSelector(selectors.contractTypes);
  const contractStatuses = useSelector(selectors.contractStatuses);
  const tenantTypes = useSelector(selectors.tenantTypes);
  const facilityRentalTypes = useSelector(selectors.facilityRentalTypes);
  const accrualTypes = useSelector(selectors.accrualTypes);
  const accrualPeriods = useSelector(selectors.accrualPeriods);

  return {
    contractTypes,
    contractStatuses,
    tenantTypes,
    facilityRentalTypes,
    accrualTypes,
    accrualPeriods,
  };
};
