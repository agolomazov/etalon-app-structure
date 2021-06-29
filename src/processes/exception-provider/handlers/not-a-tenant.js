import { push } from 'connected-react-router';
import { put } from 'redux-saga/effects';

import { APP_ROUTES, ERROR_CODES } from '@src/constants';

import { ArlkError } from '@common/errors';

import { registerExceptionHandler } from '../exception-provider';

/**
 * обработка ошибки
 * Пользователь не является Арендатором федерального имущества.
 */
const notATenantExceptionHandler = {
  canHandleException: (error) =>
    error instanceof ArlkError && error.errorCode === ERROR_CODES.ARLK0021,
  *exceptionHandlerSaga() {
    yield put(push(APP_ROUTES.NOT_A_TENANT));
  },
};

registerExceptionHandler(notATenantExceptionHandler);
