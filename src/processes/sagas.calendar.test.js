import { testSaga } from 'redux-saga-test-plan';

import { callApi } from '@common/utils';

import {
  actions as calendarActions,
  api as calendarApi,
  selectors as calendarSelectors,
} from '@features/calendar';

import { sagas as contractsSagas } from '@features/contracts';

import { exceptionHandlerSaga } from './sagas.errors';

import {
  loadPaymentCalendarFlow,
  loadPaymentCalendarDayDetailsFlow,
} from './sagas.calendar';

const error = new Error('Error');

describe('loadPaymentCalendarFlow - Загрузка информации о календаре оплат Арендатора за календарный месяц', () => {
  test('процесс выполняется успешно', () => {
    const spy = jest
      .spyOn(Date, 'now')
      .mockReturnValue(new Date(2020, 9, 10).getTime());

    const now = new Date(2020, 9, 1);
    const calendarInfo = [
      {
        contractId: '1',
        typeId: 'RENTAL',
        paymentAmount: '100',
        accrualEndDate: '2020-10-01',
      },
      {
        contractId: '2',
        typeId: 'RENTAL',
        paymentAmount: '100',
        accrualEndDate: '2020-10-10',
      },
      {
        contractId: '3',
        typeId: 'RENTAL',
        paymentAmount: '200',
        accrualEndDate: '2020-10-10',
      },
      {
        contractId: '4',
        typeId: 'RENTAL',
        paymentAmount: '300',
        accrualEndDate: '2020-10-11',
      },
    ];

    testSaga(loadPaymentCalendarFlow, { payload: now })
      .next()
      .call(callApi, calendarApi.getPaymentCalendarWidget, [
        {
          accrualEndDateFrom: '2020-10-01',
          accrualEndDateTo: '2020-10-31',
        },
      ])
      .next(calendarInfo)
      .put(
        calendarActions.setCalendarPayments({
          '2020-10-01': {
            isDebt: true,
            totalPaymentAmount: 100,
            payments: [calendarInfo[0]],
          },

          '2020-10-10': {
            isDebt: false,
            totalPaymentAmount: 300,
            payments: [calendarInfo[1], calendarInfo[2]],
          },

          '2020-10-11': {
            isDebt: false,
            totalPaymentAmount: 300,
            payments: [calendarInfo[3]],
          },
        }),
      )
      .next()
      .isDone();

    spy.mockRestore();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(loadPaymentCalendarFlow, {})
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .isDone();
  });
});

describe('loadPaymentCalendarDayDetailsFlow - Загрузка детальной информации о выбранном дне в календаре оплат Арендатора', () => {
  test('процесс выполняется успешно', () => {
    const selectedDate = new Date(2020, 9, 10);
    const paymentsGroupByDate = {
      '2020-10-01': {
        isDebt: true,
        totalPaymentAmount: 100,
        payments: [
          {
            contractId: '1',
          },
        ],
      },

      '2020-10-10': {
        isDebt: false,
        totalPaymentAmount: 300,
        payments: [
          {
            contractId: '2',
          },
          {
            contractId: '3',
          },
        ],
      },

      '2020-10-11': {
        isDebt: false,
        totalPaymentAmount: 300,
        payments: [
          {
            contractId: '4',
          },
        ],
      },
    };
    const contracts = [
      { id: '2', number: '#1', date: '2015-01-01' },
      { id: '3', number: '#2', date: '2016-01-01' },
    ];

    testSaga(loadPaymentCalendarDayDetailsFlow, { payload: selectedDate })
      .next()
      .select(calendarSelectors.calendarPayments)

      .save('before condition')
      .next(paymentsGroupByDate)
      .call(contractsSagas.loadContractsByIdsSaga, ['2', '3'])
      .next(contracts)
      .put(
        calendarActions.addContracts({
          [contracts[0].id]: {
            contractNumber: contracts[0].number,
            contractDate: contracts[0].date,
          },
          [contracts[1].id]: {
            contractNumber: contracts[1].number,
            contractDate: contracts[1].date,
          },
        }),
      )
      .next()
      .isDone()

      .restore('before condition')
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(loadPaymentCalendarDayDetailsFlow, {})
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .isDone();
  });
});
