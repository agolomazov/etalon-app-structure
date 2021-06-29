import { useSelector } from 'react-redux';

import { selectors } from '../selectors';

/**
 * @typedef {object} AppSettingsSelectorHook
 * @property {boolean} isRentalsBeFiltrationEnabled - признак фильтрации и сортировки объектов аренды на стороне BE
 * @property {boolean} isContractsBeFiltrationEnabled - признак фильтрации и сортировки договоров на стороне BE
 * @property {boolean} isAccrualsBeFiltrationEnabled - признак фильтрации и сортировки начислений на стороне BE
 * @property {boolean} isPaymentHistoryBeFiltrationEnabled - признак фильтрации и сортировки истории платежей на стороне BE
 */
/**
 * Хук возвращает параметры приложения
 * @returns {AppSettingsSelectorHook} результат
 */
export const useAppSettingsSelector = () => {
  const isRentalsBeFiltrationEnabled = useSelector(
    selectors.isRentalsBeFiltrationEnabled,
  );
  const isContractsBeFiltrationEnabled = useSelector(
    selectors.isContractsBeFiltrationEnabled,
  );
  const isAccrualsBeFiltrationEnabled = useSelector(
    selectors.isAccrualsBeFiltrationEnabled,
  );
  const isPaymentHistoryBeFiltrationEnabled = useSelector(
    selectors.isPaymentHistoryBeFiltrationEnabled,
  );

  return {
    isRentalsBeFiltrationEnabled,
    isContractsBeFiltrationEnabled,
    isAccrualsBeFiltrationEnabled,
    isPaymentHistoryBeFiltrationEnabled,
  };
};
