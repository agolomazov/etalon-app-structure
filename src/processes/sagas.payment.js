import {
  call,
  all,
  put,
  select,
  takeLatest,
  cancel,
  take,
} from 'redux-saga/effects';

import {
  sagas as contractDetailsSagas,
  selectors as contractDetailsSelectors,
} from '@features/contract-details';

import {
  actions as paymentActions,
  sagas as paymentSagas,
} from '@features/payment';

import { exceptionHandlerSaga } from './sagas.errors';

/**
 * Загрузка начислений для оплаты по договору
 *
 * @param {object} action - экшен
 * @param {string} action.payload - идентификатор договора
 *
 * @returns {void}
 */
export function* loadPaymentAccrualsFlow({ payload: contractId }) {
  try {
    // показываем loader
    yield put(paymentActions.accruals.startLoading());

    // загружаем детали договора и начисления для оплаты по договору
    yield all([
      call(contractDetailsSagas.loadContractDetailsSaga, contractId),
      call(paymentSagas.loadPaymentAccrualsSaga, contractId),
    ]);
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  } finally {
    // скрываем loader
    yield put(paymentActions.accruals.stopLoading());
  }
}

/**
 * Переход к оплате выбранных начислений
 *
 * @param {object} action - экшн
 * @param {object} action.contractId - идентификатор договора
 *
 * @returns {void}
 */
export function* goToPaymentFlow({ payload: { contractId } }) {
  try {
    // получаем номер договора
    const contractNumber = yield select(
      contractDetailsSelectors.contractNumber,
    );

    // получаем дату договора
    const contractDate = yield select(contractDetailsSelectors.contractDate);

    // переход к оплате
    yield call(paymentSagas.goToPaymentSaga, {
      contractId,
      contractNumber,
      contractDate,
    });
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Переход к предыдушему шагу по услуге ЕПС
 *
 * @returns {void}
 */
export function* goToUpsPrevStepFlow() {
  try {
    // переход к предыдушему шагу
    yield call(paymentSagas.goToUpsPrevStepSaga);
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Переход к следующему шагу по услуге ЕПС
 *
 * @returns {void}
 */
export function* goToUpsNextStepFlow() {
  try {
    // переход к следующему шагу
    yield call(paymentSagas.goToUpsNextStepSaga);
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Сага для перехода к Эквайрингу
 *
 * @returns {void}
 */
function* goToAcquireFlow() {
  try {
    // переход к Эквайрингу
    yield call(paymentSagas.goToAcquireSaga);
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Вотчер Онлайн оплаты
 *
 * @returns {void}
 */
export function* paymentWatcher() {
  while (true) {
    // запускаем процессы
    const tasks = yield all([
      takeLatest(
        paymentActions.accruals.loadPaymentAccrualsFlow,
        loadPaymentAccrualsFlow,
      ),
      takeLatest(paymentActions.accruals.goToPaymentFlow, goToPaymentFlow),
      takeLatest(paymentActions.ups.goToUpsPrevStepFlow, goToUpsPrevStepFlow),
      takeLatest(paymentActions.ups.goToUpsNextStepFlow, goToUpsNextStepFlow),
      takeLatest(paymentActions.ups.goToAcquireFlow, goToAcquireFlow),
    ]);

    // ждем экшн на unmount
    yield take(paymentActions.ups.upsViewUnmountFlow);

    // отменяем процессы
    yield cancel(tasks);

    // очищаем стор
    yield put(paymentActions.accruals.reset());
    yield put(paymentActions.ups.reset());
  }
}
