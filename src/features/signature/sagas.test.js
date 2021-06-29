import { testSaga } from 'redux-saga-test-plan';

import CryptoClient from 'crypto-api';
import { takeLatest, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';
import { selectors } from './selectors';
import {
  CRYPTO_FRAME_URL,
  CRYPTO_FRAME_ELEMENT_ID,
  STATUSES,
} from './constants';

import {
  handleErrorsSaga,
  initSaga,
  getCertificatesSaga,
  initAndGetCertificatesSaga,
  getSignResultSaga,
  signSaga,
  sagas,
} from './sagas';

const cryptoClient = new CryptoClient();

describe('handleErrorsSaga - сага обробатывает ошибки crypto-frame', () => {
  test('Сага возвращает true, если нет ошибок', () => {
    testSaga(handleErrorsSaga, { isError: false }).next().returns(true);
  });

  test('Сага возвращает false и кладет ошибки в стор, при их наличии', () => {
    const errors = [
      {
        errorCode: 'errorCode',
        errorMessage: 'errorMessage',
        errorDescription: 'errorDescription',
      },
    ];
    testSaga(handleErrorsSaga, { isError: true, errors })
      .next()
      .put(
        actions.addErrors([
          {
            code: errors[0].errorCode,
            message: errors[0].errorMessage,
            description: errors[0].errorDescription,
            recommendation: '',
          },
        ]),
      )
      .next()
      .isDone();
  });
});

describe('initSaga - сага инициализации crypto-frame', () => {
  test('Сага отрабатывает запрос к API и кладет данные в стор', () => {
    const documentIds = ['documentId'];
    const packageId = 'packageId';
    const initResult = 'initResult';
    testSaga(initSaga, documentIds)
      .next()
      .put(actions.setStatus(STATUSES.INIT))
      .next()
      .call(callApi, api.signDocuments, [documentIds])
      .next({ packageId })
      .call(
        [cryptoClient, cryptoClient.init],
        CRYPTO_FRAME_URL,
        packageId,
        CRYPTO_FRAME_ELEMENT_ID,
      )
      .next(initResult)
      .call(handleErrorsSaga, initResult)

      .save('before isSuccess')
      .next(true)
      .put(actions.setPackageId(packageId))
      .next()
      .isDone()

      .restore('before isSuccess')
      .next(false)
      .isDone();
  });
});

describe('getCertificatesSaga - сага получения списка сертификатов от crypto-frame', () => {
  test('Сага выполняется успешно', () => {
    const certificatesResult = {
      certificates: [
        { thumbprint: 'thumbprint1' },
        { thumbprint: 'thumbprint2' },
      ],
    };
    testSaga(getCertificatesSaga)
      .next()
      .put(actions.setStatus(STATUSES.CERTIFICATES))
      .next()
      .call([cryptoClient, cryptoClient.certificates])
      .next(certificatesResult)
      .call(handleErrorsSaga, certificatesResult)

      .save('before isSuccess')
      .next(true)
      .put(actions.setCertificates(certificatesResult.certificates))
      .next()
      .isDone()

      .restore('before isSuccess')
      .next(false)
      .isDone();
  });
});

describe('initAndGetCertificatesSaga - сага инициализации и получения списка сертификатов от crypto-frame', () => {
  test('Сага выполняется успешно', () => {
    const documentIds = ['documentId'];
    testSaga(initAndGetCertificatesSaga, documentIds)
      .next()
      .put(actions.startLoading())
      .next()
      .call(initSaga, documentIds)
      .next()
      .call(getCertificatesSaga)
      .next()
      .put(actions.stopLoading())
      .next()
      .isDone();
  });
});

describe('signSaga - сага формирования ЭЦП через crypto-frame', () => {
  test('Сага выполняется успешно', () => {
    const selectedCertificate = { thumbprint: 'thumbprint' };
    const signResult = { isError: false };
    testSaga(signSaga)
      .next()
      .put(actions.startLoading())
      .next()
      .put(actions.setStatus(STATUSES.SIGN))
      .next()
      .select(selectors.selectedCertificate)
      .next(selectedCertificate)
      .call([cryptoClient, cryptoClient.sign], selectedCertificate)
      .next(signResult)
      .call(handleErrorsSaga, signResult)
      .next()
      .put(actions.stopLoading())
      .next()
      .isDone();
  });
});

describe('getSignResultSaga - Сага возвращает true, если произошло успешное подписание', () => {
  test('Сага возвращает true, если успех', () => {
    testSaga(getSignResultSaga)
      .next()
      .select(selectors.status)
      .next(STATUSES.SIGN)
      .select(selectors.errors)
      .next([])
      .select(selectors.isLoading)
      .next(false)
      .returns(true);
  });

  test('Сага возвращает false, если не успех', () => {
    testSaga(getSignResultSaga)
      .next()
      .select(selectors.status)
      .next(STATUSES.SIGN)
      .select(selectors.errors)
      .next([])
      .select(selectors.isLoading)
      .next(true)
      .returns(false);
  });
});

describe('signDocumentsSaga - сага для подписания файлов, по их идентификаторам', () => {
  test('сага должна выполняться успешно', () => {
    const documentIds = ['documentId'];
    const tasks = [];
    const action = {
      type: actions.addErrors.toString(),
    };
    testSaga(sagas.signDocumentsSaga, documentIds)
      .next()
      .all([
        fork(initAndGetCertificatesSaga, documentIds),
        takeLatest(actions.sign, signSaga),
      ])
      .next(tasks)
      .take([actions.addErrors, actions.cancel, LOCATION_CHANGE])

      .save('before condition')
      .next(action)
      .cancel(tasks)
      .next()
      .take([actions.cancel, LOCATION_CHANGE])
      .next()
      .call(getSignResultSaga)
      .next()
      .put(actions.reset())
      .next()
      .isDone()

      .restore('before condition')
      .next({ type: 'anyActionType' })
      .cancel(tasks)
      .next()
      .call(getSignResultSaga)
      .next()
      .put(actions.reset())
      .next()
      .isDone();
  });
});
