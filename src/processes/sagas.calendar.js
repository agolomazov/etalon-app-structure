import {
  call,
  put,
  all,
  select,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';
import moment from 'moment';
import { groupBy, prop } from 'ramda';

import { callApi, SERVER_DATE_FORMAT } from '@common/utils';

import {
  actions as calendarActions,
  api as calendarApi,
  selectors as calendarSelectors,
} from '@features/calendar';

import { sagas as contractsSagas } from '@features/contracts';

import { exceptionHandlerSaga } from './sagas.errors';

/**
 * Загрузка информации о календаре оплат Арендатора за календарный месяц
 *
 * @param {object} action - экшен
 * @param {Date} action.payload - месяц в календаре
 *
 *
 * @returns {void}
 */
export function* loadPaymentCalendarFlow({ payload: calendarDate }) {
  try {
    // дата начала месяца
    const accrualEndDateFrom = moment(calendarDate)
      .startOf('month')
      .format(SERVER_DATE_FORMAT);
    // дата конца месяца
    const accrualEndDateTo = moment(calendarDate)
      .endOf('month')
      .format(SERVER_DATE_FORMAT);

    // получаем информации о календаре за календарный месяц
    const payments = yield call(callApi, calendarApi.getPaymentCalendarWidget, [
      {
        accrualEndDateFrom,
        accrualEndDateTo,
      },
    ]);

    // группируем по дате платежа
    const paymentsGroupByDate = Object.fromEntries(
      Object.entries(groupBy(prop('accrualEndDate'))(payments)).map(
        // eslint-disable-next-line no-shadow
        ([date, payments]) => [
          date,
          {
            isDebt: payments.some(({ accrualEndDate }) =>
              moment()
                .startOf('day')
                .isAfter(moment(accrualEndDate, SERVER_DATE_FORMAT)),
            ),
            totalPaymentAmount: payments.reduce(
              (total, { paymentAmount }) => total + Number(paymentAmount),
              0,
            ),
            payments,
          },
        ],
      ),
    );

    // кладем данные в стор
    yield put(calendarActions.setCalendarPayments(paymentsGroupByDate));
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Загрузка детальной информации о выбранном дне в календаре оплат Арендатора
 *
 * @param {object} action - экшен
 * @param {Date} action.payload - дата в календаре
 *
 * @returns {void}
 */
export function* loadPaymentCalendarDayDetailsFlow({ payload: calendarDate }) {
  try {
    // дата для которой необходимо загрузить информацию по договорам
    const accrualEndDate = moment(calendarDate).format(SERVER_DATE_FORMAT);

    // получаем информацию по календарю
    const paymentsGroupByDate = yield select(
      calendarSelectors.calendarPayments,
    );

    if (paymentsGroupByDate && paymentsGroupByDate[accrualEndDate]) {
      // получаем список идентификаторов договоров
      const { payments } = paymentsGroupByDate[accrualEndDate];
      const contractIds = [
        ...new Set(payments.map(({ contractId }) => contractId)),
      ];

      // загружаем список договоров по их идентификаторам
      const contracts = yield call(
        contractsSagas.loadContractsByIdsSaga,
        contractIds,
      );

      // формируем объект с данными по договорам
      const contractsById = contracts.reduce(
        (acc, { id, number: contractNumber, date: contractDate }) => {
          acc[id] = { contractNumber, contractDate };
          return acc;
        },
        {},
      );

      // кладем данные в стор
      yield put(calendarActions.addContracts(contractsById));
    }
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Вотчер календаря
 *
 * @returns {void}
 */
export function* calendarWatcher() {
  yield all([
    takeLatest(
      calendarActions.loadPaymentCalendarFlow,
      loadPaymentCalendarFlow,
    ),
    takeEvery(
      calendarActions.loadPaymentCalendarDayDetailsFlow,
      loadPaymentCalendarDayDetailsFlow,
    ),
  ]);
}
