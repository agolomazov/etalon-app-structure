import { put } from 'redux-saga/effects';

import { ArlkError } from '@common/errors';
import { actions as errorActions } from '@features/errors';

const exceptionHandlers = [];

/**
 * дефолтная обработка ARLK ошибок
 *
 * @param {ArlkError} error - ошибка
 *
 * @returns {void}
 */
function* defaultArlkExceptionHandler({
  errorCode,
  errorTitle,
  errorMessage,
} = {}) {
  yield put(
    errorActions.setError({
      isFatal: true,
      code: errorCode,
      title: errorTitle,
      message: errorMessage,
    }),
  );
}

/**
 * обработка неизвестных ошибок
 *
 * @param {Error} error - ошибка
 *
 * @returns {void}
 */
function* unknownExceptionHandler(error) {
  yield put(
    errorActions.setError({
      isFatal: false,
      code: 0,
      title: 'Ошибка',
      message: error.message,
    }),
  );
}

/**
 * Зарегистрировать обработчик исключения
 *
 * @param {object} params - параметры
 * @param {function} params.canHandleException - функция, которая принимает Error и возвращает true/false
 * @param {function} params.exceptionHandlerSaga - сага для обработки ошибки
 *
 * @returns {void}
 */
export const registerExceptionHandler = ({
  canHandleException,
  exceptionHandlerSaga,
}) => {
  exceptionHandlers.push({ canHandleException, exceptionHandlerSaga });
};

/**
 * Получить обработчик исключения
 *
 * @param {Error} error - ошибка
 *
 * @returns {Object} - сага
 */
export const getExceptionHandler = (error) => {
  const { exceptionHandlerSaga } =
    exceptionHandlers.find(({ canHandleException }) =>
      canHandleException(error),
    ) || {};

  return (
    exceptionHandlerSaga ||
    (error instanceof ArlkError
      ? defaultArlkExceptionHandler
      : unknownExceptionHandler)
  );
};
