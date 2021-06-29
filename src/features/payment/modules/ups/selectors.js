import { createSelector } from '@reduxjs/toolkit';
import currency from 'currency.js';

import { getConfig } from '@common/config';

const upsSelector = (state) => state[getConfig('modules.payment')].ups;

/**
 * ## [Селектор] Заголовок страницы
 */
const pageTitle = (state) => upsSelector(state).pageTitle;

/**
 * ## [Селектор] Услуга ЕПС
 */
const orderSelector = (state) => upsSelector(state).order;

/**
 * ## [Селектор] Признак отсутствия услуги ЕПС
 */
const isOrderEmpty = (state) => !orderSelector(state);

/**
 * ## [Селектор] Количество шагов
 */
const stepsCountSelector = (state) => upsSelector(state).stepsCount;

/**
 * ## [Селектор] Текущий шаг услуги ('1', '2' ... 'n', 'summa', 'pay')
 */
const currentOrderStep = (state) => orderSelector(state)?.step;

/**
 * ## [Селектор] Текущий номер шага (целое число, начинается с 0 )
 */
const currentStepNumber = createSelector(
  currentOrderStep,
  stepsCountSelector,
  (orderStep, stepsCount) => {
    if (orderStep === 'summa') {
      return stepsCount - 2;
    }

    if (orderStep === 'pay') {
      return stepsCount - 1;
    }

    return Number(orderStep ?? 1) - 1;
  },
);

/**
 * ## [Селектор] Объект со значениями измененных реквизитов
 */
const fieldValues = (state) => upsSelector(state).fieldValues;

/**
 * ## [Селектор] Массив реквизитов услуги для текущего шага
 */
const stepFields = createSelector(
  orderSelector,
  currentOrderStep,
  fieldValues,
  (order, orderStep, values) => {
    const fields =
      order?.services?.serv?.pars?.par?.filter(
        ({ step }) => step === orderStep,
      ) ?? [];

    return fields.map(
      ({
        isRequired,
        isVisible,
        isEditable,
        value,
        par_list: options = [],
        ...rest
      }) => ({
        isRequired: isRequired === '1',
        isVisible: isVisible === '1',
        isEditable: isEditable === '1',
        value: values[rest.name] ?? value,
        options: options.map(({ value: optionValue }) => optionValue),
        ...rest,
      }),
    );
  },
);

/**
 * ## [Селектор] Cумму платежа
 */
const amountSelector = (state) => orderSelector(state)?.summa || '';

/**
 * ## [Селектор] Рассчитанная комиссия
 */
const commissionSelector = (state) => orderSelector(state)?.commission || '';

/**
 * ## [Селектор] Сумма платежа + комиссия
 */
const total = createSelector(
  amountSelector,
  commissionSelector,
  (amount, commission) =>
    amount && commission
      ? currency(amount, { separator: '', symbol: '' }).add(commission).format()
      : '',
);

/**
 * ## [Селектор] Состояние загрузки
 */
const isLoading = (state) => upsSelector(state).isLoading;

export const selectors = {
  pageTitle,
  order: orderSelector,
  isOrderEmpty,
  currentStepNumber,
  stepsCount: stepsCountSelector,
  fieldValues,
  stepFields,
  amount: amountSelector,
  commission: commissionSelector,
  total,
  isLoading,
};
