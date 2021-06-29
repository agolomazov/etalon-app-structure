import { call, put, select } from 'redux-saga/effects';

import { APP_QUERY_PARAMS } from '@src/constants';

import {
  actions as situationsActions,
  selectors as situationsSelectors,
  sagas as situationsSagas,
} from '@features/situations';

import {
  selectors as contactsSelectors,
  sagas as contractsSagas,
} from '@features/contracts';

import { selectors as navigationSelectors } from '@features/navigation';

import { registrationLifeSituation } from './sagas.base-life-situation';

const { overpayment: overpaymentActions } = situationsActions;
const { overpayment: overpaymentSelectors } = situationsSelectors;
const { overpayment: overpaymentSagas } = situationsSagas;

/**
 * Создание жизненной ситуации "Распорядиться переплатой"
 *
 * @returns {void}
 */
export function* createLifeSituationFlow() {
  // загружаем список договоров
  yield call(contractsSagas.loadContractsSaga);

  // получаем список договоров
  const contracts = yield select(contactsSelectors.contractsList) || [];

  // получаем query параметр - id договора
  const { [APP_QUERY_PARAMS.CONTRACT_ID]: contractId } = yield select(
    navigationSelectors.queryParams,
  );

  // предзаполняем данные по договору
  const contract = contracts.find(({ id }) => id === contractId);
  if (contract) {
    yield put(overpaymentActions.setContract(contract));
  }
}

/**
 * Выход из жизненной ситуации "Распорядиться переплатой"
 *
 * @returns {void}
 */
export function* exitLifeSituationFlow() {
  yield put(overpaymentActions.reset());
}

/**
 * Выбор типа обращения по ЖС "Распорядиться переплатой"
 *
 * @params {object} action - экшн
 * @params {string} action.payload - тип обращения
 *
 * @returns {void}
 */
export function* chooseAppealTypeFlow({ payload: appealType }) {
  // кладем тип обращения в стор
  yield put(overpaymentActions.setAppealType(appealType));
  // получаем id обращения
  const id = yield select(overpaymentSelectors.appealId);
  // если нет id, создаем обращение
  if (!id) {
    try {
      // показываем loader
      yield put(situationsActions.startLoading());

      // создаем обращение
      yield call(overpaymentSagas.createAppealSaga);

      // добавляем платежное поручение
      yield put(overpaymentActions.addPaymentOrder());
    } finally {
      // скрываем loader
      yield put(situationsActions.stopLoading());
    }
  }
}

/**
 * Вотчер для процессов ЖС "Распорядиться переплатой"
 */
export const situationOverpaymentWatcher = registrationLifeSituation({
  startProcess: {
    action: overpaymentActions.afterCreateLifeSituationFlow,
    process: createLifeSituationFlow,
  },
  exitProcess: {
    action: overpaymentActions.beforeExitLifeSituationFlow,
    process: exitLifeSituationFlow,
  },
  subProcesses: [
    {
      action: overpaymentActions.chooseAppealTypeFlow,
      process: chooseAppealTypeFlow,
    },
  ],
});
