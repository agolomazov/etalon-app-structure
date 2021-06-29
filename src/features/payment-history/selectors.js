import { getConfig } from '@common/config';

const paymentHistory = (state) => state[getConfig('modules.paymentHistory')];

/**
 * [Селектор] Список платежей
 */
const payments = (state) => paymentHistory(state).payments;

/**
 * [Селектор] Параметры пагинации
 */
const pagination = (state) => paymentHistory(state).pagination;

/**
 * [Селектор] Query-параметры, с которыми был отправлен последний запрос
 */
const queryParams = (state) => paymentHistory(state).queryParams;

/**
 * [Селектор] Состояние загрузки
 */
const isLoading = (state) => paymentHistory(state).isLoading;

export const selectors = {
  payments,
  pagination,
  queryParams,
  isLoading,
};
