import { createSelector } from '@reduxjs/toolkit';
import currency from 'currency.js';

import { getConfig } from '@common/config';

const accrualsSelector = (state) =>
  state[getConfig('modules.payment')].accruals;

/**
 * ## [Селектор] Способ оплаты
 */
const paymentMethodSelector = (state) => accrualsSelector(state).paymentMethod;

/**
 * ## [Селектор] Кбк
 */
const bccSelector = (state) => accrualsSelector(state).bcc;

/**
 * ## [Селектор] Объект с начислениями, сгруппироваными по КБК
 */
const accrualsByBccSelector = (state) => accrualsSelector(state).accrualsByBcc;

/**
 * ## [Селектор] Объект с идентификаторами начислений, который были выбраны (группировка по КБК)
 */
const selectedIdsByBccSelector = (state) =>
  accrualsSelector(state).selectedIdsByBcc;

/**
 * ## [Селектор] Список КБК
 */
const bccList = createSelector(accrualsByBccSelector, (accrualsByBcc) =>
  Object.keys(accrualsByBcc),
);

/**
 * ## [Селектор] Список начислений для текущего КБК
 */
const accruals = createSelector(
  bccSelector,
  accrualsByBccSelector,
  (bcc, accrualsByBcc) => accrualsByBcc[bcc] ?? [],
);

/**
 * ## [Селектор] Объект с идентификаторами начислений, которые были выбраны (для текущего КБК)
 */
const selectedAccrualsIds = createSelector(
  paymentMethodSelector,
  bccSelector,
  selectedIdsByBccSelector,
  (paymentMethod, bcc, selectedIdsByBcc) =>
    selectedIdsByBcc[paymentMethod][bcc] ?? {},
);

/**
 * ## [Селектор] Список выбранных начислений для текущего КБК
 */
const selectedAccruals = createSelector(
  accruals,
  selectedAccrualsIds,
  (accs, selectedIds) =>
    accs.filter(({ accrualId }) => !!selectedIds[accrualId]),
);

/**
 * ## [Селектор] Сумма для оплаты
 */
const totalAmount = createSelector(
  accruals,
  selectedAccrualsIds,
  (accrualsList, selectedIds) =>
    accrualsList
      .reduce(
        (totalCurrency, { accrualId, paymentAmount }) =>
          selectedIds[accrualId]
            ? totalCurrency.add(paymentAmount)
            : totalCurrency,
        currency(0, { separator: '', symbol: '' }),
      )
      .format(),
);

/**
 * ## [Селектор] Нет начислений
 */
const isEmpty = (state) =>
  Object.keys(accrualsByBccSelector(state)).length === 0;

/**
 * ## [Селектор] Состояние загрузки
 */
const isLoading = (state) => accrualsSelector(state).isLoading;

export const selectors = {
  paymentMethod: paymentMethodSelector,
  bcc: bccSelector,
  bccList,
  accruals,
  selectedAccrualsIds,
  selectedAccruals,
  totalAmount,
  isEmpty,
  isLoading,
};
