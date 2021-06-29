import { call, put, all } from 'redux-saga/effects';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';

/**
 * Сага для загрузки виджета оплаты и виджета количества договоров и объектов
 *
 * @returns {void}
 */
function* loadPaymentWidgetSaga() {
  // отправляем запрос на бекенд, получаем данные виджета
  const widgetData = yield call(callApi, api.getPaymentWidgetData);

  const {
    facilityRentalCount,
    contractCount,
    ...paymentWidgetData
  } = widgetData;

  // кладем данные о виджете оплаты в стор
  yield put(actions.setPaymentWidgetData(paymentWidgetData));

  // кладем данные о количестве договоров и объектов в стор
  yield put(
    actions.setItemsCountWidgetData({
      contractCount,
      facilityRentalCount,
    }),
  );
}

/**
 * Сага для загрузки виджета входящих документов
 *
 * @returns {void}
 */
function* loadIncomingDocumentsWidgetSaga() {
  // отправляем запрос на бекенд, получаем данные виджета
  const incomingDocumentsWidgetData = yield call(
    callApi,
    api.getIncomingDocumentsWidgetData,
    [],
    ['data', 'incomingDocuments'],
  );

  // кладем полученные данные в стор
  yield put(
    actions.setIncomingDocumentsWidgetData(incomingDocumentsWidgetData),
  );
}

/**
 * Сага для загрузки всех виджетов
 *
 * @returns {void}
 */
function* loadAllWidgetsSaga() {
  try {
    // показываем loader
    yield put(actions.startLoading());

    // загружаем данные по всем виджетам
    yield all([
      call(loadPaymentWidgetSaga),
      call(loadIncomingDocumentsWidgetSaga),
    ]);
  } finally {
    // скрываем loader
    yield put(actions.stopLoading());
  }
}

export const sagas = {
  loadPaymentWidgetSaga,
  loadIncomingDocumentsWidgetSaga,
  loadAllWidgetsSaga,
};
