import { createSelector } from '@reduxjs/toolkit';
import { uniqBy, prop } from 'ramda';

import { getConfig } from '@common/config';

/**
 * Селектор информации о календаре оплат
 */
const calendarSelector = (state) => state[getConfig('modules.calendar')];

/**
 * Селектор информации о календаре оплат
 */
const calendarPayments = (state) => calendarSelector(state).dates;

/**
 * Селектор информации о договорах
 */
const contractsDetails = (state) => calendarSelector(state).contracts;

/**
 * Функция создает селектор, который возвращает информацию по платежам на выбранную дату
 */
const createCalendarPaymentsByDateSelector = () =>
  createSelector(
    calendarPayments,
    contractsDetails,
    (_, date) => date,
    (calendar, contracts, date) => {
      const { totalPaymentAmount = 0, payments = [] } = calendar[date] || {};

      return {
        totalPaymentAmount,
        payments: uniqBy(prop('contractId'), payments).map((payment) => ({
          contractNumber: contracts[payment.contractId]?.contractNumber,
          contractDate: contracts[payment.contractId]?.contractDate,
          ...payment,
        })),
      };
    },
  );

export const selectors = {
  calendarPayments,
  createCalendarPaymentsByDateSelector,
};
