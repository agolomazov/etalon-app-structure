import CryptoClient from 'crypto-api';
import {
  call,
  take,
  put,
  select,
  takeLatest,
  fork,
  all,
  cancel,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';
import { selectors } from './selectors';
import { extractCryptoProErrorCode } from './utils';
import {
  CRYPTO_FRAME_URL,
  CRYPTO_FRAME_ELEMENT_ID,
  STATUSES,
  EMPTY_CERTIFICATES_ERROR_MESSAGE,
  CRYPTO_PRO_ERROR_CODE_MAP,
} from './constants';

const cryptoClient = new CryptoClient();

/**
 * Сага обробатывает ошибки crypto-frame
 *
 * @param {object} resultOfCallingCryptoClientMethod - результат вызова методов cryptoClient
 *
 * @returns {boolean} true - отсутствие ошибок
 */
export function* handleErrorsSaga(resultOfCallingCryptoClientMethod) {
  if (!resultOfCallingCryptoClientMethod.isError) {
    return true;
  }

  yield put(
    actions.addErrors(
      resultOfCallingCryptoClientMethod.errors.map(
        ({
          errorCode: code,
          errorMessage: message,
          errorDescription: description,
        }) => ({
          code,
          message,
          description,
          recommendation:
            CRYPTO_PRO_ERROR_CODE_MAP[
              extractCryptoProErrorCode(message).toUpperCase()
            ] || '',
        }),
      ),
    ),
  );
  return false;
}

/**
 * Сага инициализации crypto-frame
 *
 * @param {Array<number>} documentIds - Идентификаторы документов
 *
 * @returns {void}
 */
export function* initSaga(documentIds) {
  // устанавливаем статус
  yield put(actions.setStatus(STATUSES.INIT));

  // передача id файлов для подписания
  const { packageId } = yield call(callApi, api.signDocuments, [documentIds]);

  // инициализация фрейма
  const initResult = yield call(
    [cryptoClient, cryptoClient.init],
    CRYPTO_FRAME_URL,
    packageId,
    CRYPTO_FRAME_ELEMENT_ID,
  );

  // обработка ошибок фрейма
  const isSuccess = yield call(handleErrorsSaga, initResult);

  // кладем packageId в стор
  if (isSuccess) {
    yield put(actions.setPackageId(packageId));
  }
}

/**
 * Сага получения списка сертификатов от crypto-frame
 *
 * @returns {void}
 */
export function* getCertificatesSaga() {
  // устанавливаем статус
  yield put(actions.setStatus(STATUSES.CERTIFICATES));

  // получаем список сертификатов
  const certificatesResult = yield call([
    cryptoClient,
    cryptoClient.certificates,
  ]);

  // обработка ошибок фрейма
  const isSuccess = yield call(handleErrorsSaga, certificatesResult);

  // кладем сертификаты в стор
  if (isSuccess) {
    const certificatesNotEmpty =
      certificatesResult.certificates &&
      certificatesResult.certificates.length > 0;

    yield put(
      certificatesNotEmpty
        ? actions.setCertificates(certificatesResult.certificates)
        : actions.addErrors([
            {
              code: '',
              message: EMPTY_CERTIFICATES_ERROR_MESSAGE.message,
              recommendation: EMPTY_CERTIFICATES_ERROR_MESSAGE.recommendation,
            },
          ]),
    );
  }
}

/**
 * Сага инициализации и получения списка сертификатов от crypto-frame
 *
 * @param {Array<number>} documentIds - Идентификаторы документов
 *
 * @returns {void}
 */
export function* initAndGetCertificatesSaga(documentIds) {
  try {
    // показываем loader
    yield put(actions.startLoading());

    // инициализация crypto-frame
    yield call(initSaga, documentIds);

    // получение списка сертификатов
    yield call(getCertificatesSaga);
  } finally {
    // скрываем loader
    yield put(actions.stopLoading());
  }
}

/**
 * Сага формирования ЭЦП через crypto-frame
 *
 * @returns {void}
 */
export function* signSaga() {
  try {
    // показываем loader
    yield put(actions.startLoading());

    // устанавливаем статус
    yield put(actions.setStatus(STATUSES.SIGN));

    // получаем сертификат
    const selectedCertificate = yield select(selectors.selectedCertificate);

    // формирум электронную подпись
    const signResult = yield call(
      [cryptoClient, cryptoClient.sign],
      selectedCertificate,
    );

    // обработка ошибок фрейма
    yield call(handleErrorsSaga, signResult);
  } finally {
    // скрываем loader
    yield put(actions.stopLoading());
  }
}

/**
 * Сага возвращает true, если произошло успешное подписание
 *
 * @returns {boolean} результат подписания
 */
export function* getSignResultSaga() {
  // получаем статус
  const status = yield select(selectors.status);
  // получаем массив ошибок
  const errors = yield select(selectors.errors);
  // получаем статус загрузки
  const isLoading = yield select(selectors.isLoading);

  // получаем результат
  const isSuccess =
    status === STATUSES.SIGN && errors.length === 0 && !isLoading;

  return isSuccess;
}

/**
 * Сага для подписания файлов, по их идентификаторам
 *
 * @param {Array<number|string>} documentIds - Идентификаторы документов
 *
 * @returns {boolean} - результат подписания
 */
function* signDocumentsSaga(documentIds) {
  try {
    // запускаем саги
    const tasks = yield all([
      fork(initAndGetCertificatesSaga, documentIds),
      takeLatest(actions.sign, signSaga),
    ]);

    // ждем экшн на отмену или ошибку
    const action = yield take([
      actions.addErrors,
      actions.cancel,
      LOCATION_CHANGE,
    ]);

    // произошла ошибка
    if (action.type === actions.addErrors.toString()) {
      // отменяем саги
      yield cancel(tasks);
      // ждем экшн на отмену
      yield take([actions.cancel, LOCATION_CHANGE]);
    } else {
      // отменяем саги
      yield cancel(tasks);
    }

    // получаем результат
    const isSuccess = yield call(getSignResultSaga);

    // возвращаем результат
    return isSuccess;
  } finally {
    // сбрасываем состояние
    yield put(actions.reset());
  }
}

export const sagas = {
  signDocumentsSaga,
};
