import { getConfig } from '@common/config';

const widgetsSelector = (state) => state[getConfig('modules.widgets')];

/**
 * Селектор данных виджета оплаты
 */
const paymentWidgetData = (state) => widgetsSelector(state).paymentWidgetData;

/**
 * Селектор данных виджета счетчика объектов и договоров
 */
const itemsCountWidgetData = (state) =>
  widgetsSelector(state).itemsCountWidgetData;

/**
 * Селектор данных виджета входящих документов
 */
const incomingDocumentsWidgetData = (state) =>
  widgetsSelector(state).incomingDocumentsWidgetData;

/**
 * Селектор состояния загрузки
 */
const isLoading = (state) => widgetsSelector(state).isLoading;

export const selectors = {
  paymentWidgetData,
  itemsCountWidgetData,
  incomingDocumentsWidgetData,
  isLoading,
};
