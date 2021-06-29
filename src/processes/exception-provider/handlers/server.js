import { put } from 'redux-saga/effects';

import { ServerError } from '@common/errors';

import { actions as errorActions } from '@features/errors';

import { registerExceptionHandler } from '../exception-provider';

/**
 * обработка ошибки ServerError
 */
const serverExceptionHandler = {
  canHandleException: (error) => error instanceof ServerError,
  *exceptionHandlerSaga(error) {
    yield put(
      errorActions.setError({
        isFatal: true,
        message: error.message,
        code: error.code,
      }),
    );
  },
};

registerExceptionHandler(serverExceptionHandler);
