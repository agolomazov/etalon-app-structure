import { getConfig } from '@common/config';

/**
 * [Селектор] Параметры приложения
 */
const appSettings = (state) => state[getConfig('modules.appSettings')];

/**
 * [Селектор] Признак фильтрации и сортировки объектов аренды на стороне BE
 */
const isRentalsBeFiltrationEnabled = (state) =>
  appSettings(state).isRentalsBeFiltrationEnabled;

/**
 * [Селектор] Признак фильтрации и сортировки договоров на стороне BE
 */
const isContractsBeFiltrationEnabled = (state) =>
  appSettings(state).isContractsBeFiltrationEnabled;

/**
 * [Селектор] Признак фильтрации и сортировки начислений на стороне BE
 */
const isAccrualsBeFiltrationEnabled = (state) =>
  appSettings(state).isAccrualsBeFiltrationEnabled;

/**
 * [Селектор] Признак фильтрации и сортировки истории платежей на стороне BE
 */
const isPaymentHistoryBeFiltrationEnabled = (state) =>
  appSettings(state).isPaymentHistoryBeFiltrationEnabled;

/**
 * [Селектор] признак того, что параметры приложения были установлены
 */
const isAppSettingsLoaded = (state) => appSettings(state).isAppSettingsLoaded;

export const selectors = {
  isRentalsBeFiltrationEnabled,
  isContractsBeFiltrationEnabled,
  isAccrualsBeFiltrationEnabled,
  isPaymentHistoryBeFiltrationEnabled,
  isAppSettingsLoaded,
};
