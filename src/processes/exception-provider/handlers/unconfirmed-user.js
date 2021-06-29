import { push } from 'connected-react-router';
import { put } from 'redux-saga/effects';

import { APP_ROUTES } from '@src/constants';

import { UnconfirmedUserError } from '@common/modules/user';

import { registerExceptionHandler } from '../exception-provider';

/**
 * обработка ошибки UnconfirmedUserError
 */
const unconfirmedUserHandler = {
  canHandleException: (error) => error instanceof UnconfirmedUserError,
  *exceptionHandlerSaga() {
    yield put(push(APP_ROUTES.UNCONFIRMED_USER));
  },
};

registerExceptionHandler(unconfirmedUserHandler);
