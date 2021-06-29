import { call, put, select } from 'redux-saga/effects';
import { clone } from 'ramda';
import { push } from 'connected-react-router';

import { APP_ROUTES } from '@src/constants';
import { callApi, createNumericGenerator } from '@common/utils';

import { PAYMENT_METHOD_TYPES, BCC_TITLE_MAP } from './constants';
import { api } from './api';

import {
  actions as accrualsActions,
  selectors as accrualsSelectors,
} from './modules/accruals';

import {
  actions as upsActions,
  selectors as upsSelectors,
} from './modules/ups';

/**
 * Сага выбирает все начисления для метода оплаты через ЛК
 *
 * @returns {void}
 */
export function* selectAllAccrualsForPaymentMethodLk() {
  // получаем список КБК
  const bccList = yield select(accrualsSelectors.bccList);

  // вибираем все начисления
  // eslint-disable-next-line no-restricted-syntax
  for (const bcc of bccList) {
    yield put(accrualsActions.setBcc(bcc));
    yield put(accrualsActions.selectBccAccruals(true));
  }
}

/**
 * Сага загружает начисления для оплаты по договору
 *
 * @param {string} contractId - идентификатор договора
 *
 * @returns {void}
 */
function* loadPaymentAccrualsSaga(contractId) {
  // очищаем предыдущее состояние стора
  yield put(accrualsActions.reset());

  // загружаем начисления
  const { bccPayments = [] } = yield call(callApi, api.getPaymentAccruals, [
    contractId,
  ]);

  // сортируем группы начислений
  const sortedBccPayments = [...bccPayments].sort(
    ({ bcc: bcc1 }, { bcc: bcc2 }) =>
      (BCC_TITLE_MAP[bcc1]?.ordinalNumber || 1000) -
      (BCC_TITLE_MAP[bcc2]?.ordinalNumber || 1000),
  );

  // создаем числовой генератор
  const genId = yield call(createNumericGenerator);

  /*
   * создаем объект { bcc1: [accrualsForBcc1], bcc2: [accrualsForBcc2] ... }
   * подмешиваем к каждому начислению сгенерированный идентификатор
   */
  const accrualsByBcc = Object.fromEntries(
    sortedBccPayments.map(({ bcc, payments = [] }) => [
      bcc,
      payments.map((accrual) => ({
        ...accrual,
        accrualId: genId().toString(),
      })),
    ]),
  );

  // кладем начисления в стор
  yield put(accrualsActions.setAccrualsByBcc(accrualsByBcc));

  // выбирает все начисления для метода оплаты через ЛК
  yield call(selectAllAccrualsForPaymentMethodLk);

  // устанавливаем КБК
  yield put(accrualsActions.setBcc(sortedBccPayments[0]?.bcc || ''));
}

/**
 * Сага для перехода к оплате выбранных начислений через ЕПГУ
 *
 * @returns {void}
 */
export function* goToEsiaPaymentSaga() {
  // получаем список выбранных начислений
  const selectedAccruals = yield select(accrualsSelectors.selectedAccruals);

  // получаем ссылку на оплату через ЕПГУ
  const { esiaHref } = selectedAccruals?.[0];

  // открываем ссылку в новой вкладке
  if (esiaHref) {
    yield call([window, window.open], esiaHref, '_blank');
  }
}

/**
 * Сага для перехода к оплате выбранных начислений через ЛК
 *
 * @param {object} params - входные параметры
 * @param {string} params.contractId - идентификатор договора
 * @param {string} params.contractNumber - номер договора
 * @param {string} params.contractDate - дата договора
 *
 * @returns {void}
 */
export function* goToLkPaymentSaga({
  contractId,
  contractNumber,
  contractDate,
}) {
  try {
    // показываем loader
    yield put(accrualsActions.startLoading());

    // получаем КБК
    const bcc = yield select(accrualsSelectors.bcc);

    // получаем сумму
    const totalAmount = yield select(accrualsSelectors.totalAmount);

    // устанавливаем заголовок страницы
    yield put(upsActions.setPageTitle(BCC_TITLE_MAP[bcc]?.upsTitle || bcc));

    // получаем список реквизитов услуги от BE
    const order = yield call(callApi, api.checkPayForUpsOrder, [
      {
        step: '0',
      },
    ]);

    // кладем список реквизитов услуги в стор
    yield put(upsActions.setOrder(order));

    // устанавливаем сумму
    yield put(upsActions.setAmount(totalAmount));

    // расчитываем количество шагов
    const stepsCount =
      order?.services?.serv?.pars?.par?.reduce(
        (count, { step }) => (Number(step) > count ? Number(step) : count),
        0,
      ) ?? 0;

    // кладем количество шагов в стор
    yield put(upsActions.setStepsCount(stepsCount + 2));

    /*
     * выбранные начисления
     * landlord
     */
    yield contractNumber;
    yield contractDate;

    // редирект на страницу ЕПС
    yield put(push(APP_ROUTES.CONTRACT_PAYMENT_UPS(contractId)));
  } finally {
    // скрываем loader
    yield put(accrualsActions.stopLoading());
  }
}

/**
 * Сага для перехода к оплате выбранных начислений
 *
 * @param {object} params - входные параметры
 * @param {string} params.contractId - идентификатор договора
 * @param {string} params.contractNumber - номер договора
 * @param {string} params.contractDate - дата договора
 *
 * @returns {void}
 */
function* goToPaymentSaga({ contractId, contractNumber, contractDate }) {
  // получаем способ оплаты
  const paymentMethod = yield select(accrualsSelectors.paymentMethod);

  // оплата через ЕПГУ
  if (paymentMethod === PAYMENT_METHOD_TYPES.EPGU) {
    yield call(goToEsiaPaymentSaga);
  }

  // оплата через ЛК
  if (paymentMethod === PAYMENT_METHOD_TYPES.LK) {
    yield call(goToLkPaymentSaga, { contractId, contractNumber, contractDate });
  }
}

/**
 * Сага для перехода к предыдушему шагу по услуге ЕПС
 *
 * @returns {void}
 */
function* goToUpsPrevStepSaga() {
  // получаем количество шагов
  const stepsCount = yield select(upsSelectors.stepsCount);

  // получаем номер шага
  const currentStepNumber = yield select(upsSelectors.currentStepNumber);

  // является ли шаг последним
  const isLastStep = currentStepNumber === stepsCount - 1;

  // устанавливаем шаг для услуги
  yield put(
    upsActions.setOrderStep(
      isLastStep ? 'summa' : currentStepNumber.toString(),
    ),
  );
}

/**
 * Сага для перехода к следующему шагу по услуге ЕПС
 *
 * @returns {void}
 */
function* goToUpsNextStepSaga() {
  try {
    // показываем loader
    yield put(upsActions.startLoading());

    // получаем услугу ЕПС
    const order = clone(yield select(upsSelectors.order));

    // получаем значения измененных реквизитов
    const fieldValues = yield select(upsSelectors.fieldValues);

    // добавляем значения измененных реквизитов к услуге
    order.services.serv.pars.par = order.services.serv.pars.par.map((field) =>
      field.step === order.step
        ? {
            ...field,
            value: fieldValues[field.name] ?? field.value,
          }
        : field,
    );

    // отправляем информацию по услугу на BE
    const newOrder = yield call(callApi, api.checkPayForUpsOrder, [order]);

    // удаляем значения измененных реквизитов из стора
    yield put(upsActions.removeFieldValuesForCurrentStep());

    // кладем обнавленную информацию по услуге в стор
    yield put(upsActions.setOrder(newOrder));
  } finally {
    // скрываем loader
    yield put(upsActions.stopLoading());
  }
}

/**
 * Сага для перехода к Эквайрингу
 *
 * @returns {void}
 */
function* goToAcquireSaga() {}

export const sagas = {
  loadPaymentAccrualsSaga,
  goToPaymentSaga,
  goToUpsPrevStepSaga,
  goToUpsNextStepSaga,
  goToAcquireSaga,
};
