import { call, select, put } from 'redux-saga/effects';

import { callApi } from '@common/utils';

import { APP_QUERY_PARAMS } from '@src/constants';

import {
  actions as situationsActions,
  sagas as situationsSagas,
  selectors as situationSelectors,
} from '@features/situations';

import { SITUATION_APPEAL_TYPES } from '@features/situations/constants';

import { selectors as navigationSelectors } from '@features/navigation';

import {
  actions as rentalActions,
  api as rentalApi,
} from '@features/rental-objects';

import {
  sagas as contractsSagas,
  selectors as contactsSelectors,
} from '@features/contracts';

import { registrationLifeSituation } from './sagas.base-life-situation';

const { changeObjectInfo: changeObjectInfoActions } = situationsActions;
const { changeObjectInfo: changeObjectInfoSagas } = situationsSagas;
const { changeObjectInfo: changeObjectInfoSelectors } = situationSelectors;

/**
 * Создание жизненной ситуации "Внести изменения в объект аренды"
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
    yield put(changeObjectInfoActions.setContract(contract));
    yield put(changeObjectInfoActions.situationOnContractChangeFlow());
  }

  const { [APP_QUERY_PARAMS.APPEAL_TYPE]: appealType } = yield select(
    navigationSelectors.queryParams,
  );
  // предзаполняем тип обращения
  if (appealType && appealType !== null) {
    yield put(changeObjectInfoActions.chooseAppealTypeFlow(appealType));
  }
}

/**
 * Выход из жизненной ситуации "Внести изменения в объект аренды"
 *
 * @returns {void}
 */
export function* exitLifeSituationFlow() {
  yield put(changeObjectInfoActions.reset());
}

/**
 * Получение списка объектов по номеру договора
 *
 * @returns {void}
 */
export function* situationOnContractChangeFlow() {
  const { id = '' } = yield select(changeObjectInfoSelectors.appealContract);
  if (id !== '') {
    // получаем список объектов
    const facilityRentals = yield call(
      callApi,
      rentalApi.getFacilityRentalByContract,
      [id],
      ['data', 'content'],
    );
    // кладем полученные данные в стор
    yield put(rentalActions.setRentals(facilityRentals));

    // получаем счетчик недостающих данных
    const missingData = yield call(
      callApi,
      rentalApi.getMissingFacilityRentalData,
      [id],
      ['data'],
    );
    // кладем полученные данные в стор
    yield put(changeObjectInfoActions.setMissingData(missingData));

    if (missingData.missingDataExists === false) {
      yield put(
        changeObjectInfoActions.chooseAppealTypeFlow(
          SITUATION_APPEAL_TYPES.CHANGE_OBJECT_INFO,
        ),
      );
    }
  }
}

/**
 * Выбор типа обращения по ЖС "Внести изменения в объект аренды"
 *
 * @params {object} action - экшн
 * @params {string} action.payload - тип обращения
 *
 * @returns {void}
 */
export function* chooseAppealTypeFlow({ payload: appealType }) {
  // кладем тип обращения в стор
  yield put(changeObjectInfoActions.setAppealType(appealType));
  // получаем id обращения
  const id = yield select(changeObjectInfoSelectors.appealId);
  // если нет id, создаем обращение
  if (!id) {
    try {
      // показываем loader
      yield put(situationsActions.startLoading());

      // создаем обращение
      yield call(changeObjectInfoSagas.createAppealSaga);
    } finally {
      // скрываем loader
      yield put(situationsActions.stopLoading());
    }
  }
}

/**
 * Вотчер для процессов ЖС "Внести изменения в объект аренды"
 */
export const situationChangeObjectInfoWatcher = registrationLifeSituation({
  startProcess: {
    action: changeObjectInfoActions.afterCreateLifeSituationFlow,
    process: createLifeSituationFlow,
  },
  exitProcess: {
    action: changeObjectInfoActions.beforeExitLifeSituationFlow,
    process: exitLifeSituationFlow,
  },
  subProcesses: [
    {
      action: changeObjectInfoActions.situationOnContractChangeFlow,
      process: situationOnContractChangeFlow,
    },
    {
      action: changeObjectInfoActions.chooseAppealTypeFlow,
      process: chooseAppealTypeFlow,
    },
  ],
});
