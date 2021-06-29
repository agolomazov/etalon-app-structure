import { testSaga } from 'redux-saga-test-plan';

import { APP_QUERY_PARAMS } from '@src/constants';

import { callApi } from '@common/utils';

import {
  actions as situationsActions,
  sagas as situationsSagas,
  selectors as situationSelectors,
} from '@features/situations';

import { SITUATION_APPEAL_TYPES } from '@features/situations/constants';
import {
  actions as rentalActions,
  api as rentalApi,
} from '@features/rental-objects';

import { selectors as navigationSelectors } from '@features/navigation';

import {
  sagas as contractsSagas,
  selectors as contactsSelectors,
} from '@features/contracts';

const { changeObjectInfo: changeObjectInfoActions } = situationsActions;
const { changeObjectInfo: changeObjectInfoSagas } = situationsSagas;
const { changeObjectInfo: changeObjectInfoSelectors } = situationSelectors;

import {
  createLifeSituationFlow,
  exitLifeSituationFlow,
  situationOnContractChangeFlow,
} from './sagas.change-object-info';

describe('createLifeSituationFlow - Создание жизненной ситуации "Внести изменения в объект аренды"', () => {
  const contracts = [{ id: 1 }, { id: 2 }];
  const appealType = 'type';
  test('процесс выполняется успешно', () => {
    testSaga(createLifeSituationFlow)
      .next()
      .call(contractsSagas.loadContractsSaga)
      .next()
      .select(contactsSelectors.contractsList)
      .next(contracts)
      .select(navigationSelectors.queryParams)

      .save('before condition')
      .next({ [APP_QUERY_PARAMS.CONTRACT_ID]: 1 })
      .put(changeObjectInfoActions.setContract(contracts[0]))
      .next()
      .put(changeObjectInfoActions.situationOnContractChangeFlow())
      .next()
      .next({ [APP_QUERY_PARAMS.APPEAL_TYPE]: 'type' })
      .put(changeObjectInfoActions.chooseAppealTypeFlow('type'))
      .next()
      .isDone()

      .restore('before condition')
      .next({ [APP_QUERY_PARAMS.CONTRACT_ID]: 3 })
      .next({ [APP_QUERY_PARAMS.APPEAL_TYPE]: null })
      .next()
      .isDone();
  });
});

describe('exitLifeSituationFlow - Выход из жизненной ситуации "Внести изменения в объект аренды"', () => {
  test('процесс выполняется успешно', () => {
    testSaga(exitLifeSituationFlow)
      .next()
      .put(changeObjectInfoActions.reset())
      .next()
      .isDone();
  });
});

describe('situationOnContractChangeFlow - Получение списка объектов по номеру договора', () => {
  test('процесс выполняется успешно', () => {
    const documentIdEmpty = '';
    const id = 1;
    const facilityRentals = [1, 2, 3];
    const missingData = {
      missingDataExists: true,
      missingData: { a: 1 },
    };
    const noMissingData = {
      missingDataExists: false,
    };
    testSaga(situationOnContractChangeFlow)
      .next()
      .select(changeObjectInfoSelectors.appealContract)

      .save('before condition')
      .next({ id })
      .call(
        callApi,
        rentalApi.getFacilityRentalByContract,
        [id],
        ['data', 'content'],
      )
      .next(facilityRentals)
      .put(rentalActions.setRentals(facilityRentals))
      .next()
      .call(callApi, rentalApi.getMissingFacilityRentalData, [id], ['data'])
      .save('missingData condition')
      .next(missingData)
      .put(changeObjectInfoActions.setMissingData(missingData))
      .next()
      .isDone()

      .restore('missingData condition')
      .next(noMissingData)
      .put(changeObjectInfoActions.setMissingData(noMissingData))
      .next()
      .put(
        changeObjectInfoActions.chooseAppealTypeFlow(
          SITUATION_APPEAL_TYPES.CHANGE_OBJECT_INFO,
        ),
      )
      .next()
      .isDone()

      .restore('before condition')
      .next({ documentId: documentIdEmpty })
      .next()
      .isDone();
  });
});
