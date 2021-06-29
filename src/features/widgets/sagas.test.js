import { testSaga } from 'redux-saga-test-plan';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';
import { sagas } from './sagas';

describe('loadPaymentWidgetSaga - Сага для загрузки виджета оплаты и виджета количества договоров и объектов', () => {
  test('сага отправляет запрос на сервер и кладет полученные данные в стор', () => {
    const widgetData = {
      accuredContractCount: 1,
      contractCount: 4,
      currentDate: '2020-05-28',
      error: null,
      facilityRentalCount: 7,
      hasDebt: true,
      totalAmount: {
        totalAmountToPayment: '356181',
        totalCurrentPeriodAmountToPayment: '202000',
        totalDebtAmount: '154181',
        totalPenaltyAmount: '658',
      },
    };
    const { contractCount, facilityRentalCount, ...payment } = widgetData;

    testSaga(sagas.loadPaymentWidgetSaga)
      .next()
      .call(callApi, api.getPaymentWidgetData)
      .next(widgetData)
      .put(actions.setPaymentWidgetData(payment))
      .next()
      .put(
        actions.setItemsCountWidgetData({ contractCount, facilityRentalCount }),
      )
      .next()
      .isDone();
  });
});

describe('loadIncomingDocumentsWidgetSaga - Сага для загрузки виджета входящих документов', () => {
  test('сага отправляет запрос на сервер и кладет полученные данные в стор', () => {
    const incomingDocs = [];

    testSaga(sagas.loadIncomingDocumentsWidgetSaga)
      .next()
      .call(
        callApi,
        api.getIncomingDocumentsWidgetData,
        [],
        ['data', 'incomingDocuments'],
      )
      .next(incomingDocs)
      .put(actions.setIncomingDocumentsWidgetData(incomingDocs))
      .next()
      .isDone();
  });
});
