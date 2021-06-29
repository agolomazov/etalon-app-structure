import { getConfig } from '@common/config';

const contractDetailsSelector = (state) =>
  state[getConfig('modules.contractDetails')];

/**
 * ## [Селектор] Детали договора
 */
const contractDetails = (state) =>
  contractDetailsSelector(state).contractDetails;

/**
 * ## [Селектор] Номер договора
 */
const contractNumber = (state) => contractDetails(state)?.number || '';

/**
 * ## [Селектор] Дата договора
 */
const contractDate = (state) => contractDetails(state)?.date || '';

/**
 * ## [Селектор] Состояние загрузки
 */
const isLoading = (state) => contractDetailsSelector(state).isLoading;

export const selectors = {
  contractDetails,
  contractNumber,
  contractDate,
  isLoading,
};
