import { push } from 'connected-react-router';
import { put } from 'redux-saga/effects';

import { APP_ROUTES } from '@src/constants';
import { AccessDeniedError } from '@common/errors';

import { registerExceptionHandler } from '../exception-provider';

/**
 * обработка ошибки AccessDeniedError
 */
const accessDeniedExceptionHandler = {
  canHandleException: (error) => error instanceof AccessDeniedError,
  *exceptionHandlerSaga() {
    yield put(push(APP_ROUTES.ACCESS_DENIED));
  },
};

registerExceptionHandler(accessDeniedExceptionHandler);
