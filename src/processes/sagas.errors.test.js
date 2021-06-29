import { testSaga } from 'redux-saga-test-plan';

import { getExceptionHandler } from './exception-provider';
import { exceptionHandlerSaga } from './sagas.errors';

/**
 * Сага для обработки исключений
 *
 * @param {object} error - ошибка
 *
 * @returns {void}
 */
describe('exceptionHandlerSaga', () => {
  test('сага должна использвоать exception proveder для обработки исключений', () => {
    const error = new Error();
    function* saga() {}

    testSaga(exceptionHandlerSaga, error)
      .next()
      .call(getExceptionHandler, error)
      .next(saga)
      .call(saga, error)
      .next()
      .isDone();
  });
});
