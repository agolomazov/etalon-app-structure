import { call } from 'redux-saga/effects';
import { getExceptionHandler } from './exception-provider';

/**
 * Сага для обработки исключений
 *
 * @param {object} error - ошибка
 *
 * @returns {void}
 */
export function* exceptionHandlerSaga(error) {
  const saga = yield call(getExceptionHandler, error);
  yield call(saga, error);
}
