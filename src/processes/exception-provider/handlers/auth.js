import { call } from 'redux-saga/effects';

import { ROSIM_URL } from '@src/constants';
import { AuthError } from '@common/errors';
import { NoActiveCompanyError } from '@common/modules/user';

import { registerExceptionHandler } from '../exception-provider';

/**
 * обработка ошибки AuthError | NoActiveCompanyError
 */
const authExceptionHandler = {
  canHandleException: (error) =>
    error instanceof AuthError || error instanceof NoActiveCompanyError,
  *exceptionHandlerSaga() {
    yield call([window.location, window.location.replace], ROSIM_URL);
  },
};

registerExceptionHandler(authExceptionHandler);
