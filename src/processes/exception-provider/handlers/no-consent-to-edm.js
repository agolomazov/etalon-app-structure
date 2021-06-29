import { push } from 'connected-react-router';
import { put } from 'redux-saga/effects';

import { APP_ROUTES } from '@src/constants';

import { NoConsentToEdmError } from '@common/modules/user';

import { registerExceptionHandler } from '../exception-provider';

/**
 * обработка ошибки NoConsentToEdmError
 */
const noConsentToEdmExceptionHandler = {
  canHandleException: (error) => error instanceof NoConsentToEdmError,
  *exceptionHandlerSaga() {
    yield put(push(APP_ROUTES.CONSENT_TO_EDM));
  },
};

registerExceptionHandler(noConsentToEdmExceptionHandler);
