import { testSaga } from 'redux-saga-test-plan';
import { withPermission } from './utils';

import { selectors } from './selectors';

describe('withPermission - Проверяет есть ли необходимый premission для выполнения саги, и вызывает новую сагу', () => {
  test('метод должен возвращать сагу', () => {
    const saga = withPermission('permission')();
    expect(typeof saga.next).toBe('function');
  });

  test('Есть permission - результирующая сага должна запускать оригинальную сагу', () => {
    const permissions = ['1', '2', '3'];
    const permission = '1';
    function* saga() {}
    const wrappedSaga = withPermission({ permission, saga });

    testSaga(wrappedSaga)
      .next()
      .select(selectors.userPermissions)
      .next(permissions)
      .call(saga)
      .next()
      .isDone();
  });

  test('Нет permission', () => {
    const permissions = ['1', '2', '3'];
    const permission = '4';
    function* saga() {}
    const wrappedSaga = withPermission({ permission, saga });

    testSaga(wrappedSaga)
      .next()
      .select(selectors.userPermissions)
      .next(permissions)
      .isDone();
  });

  test('Нет permission, есть альтернативная сага', () => {
    const permissions = ['1', '2', '3'];
    const permission = '4';
    function* saga() {}
    function* alternativeSaga() {}
    const wrappedSaga = withPermission({ permission, saga, alternativeSaga });

    testSaga(wrappedSaga)
      .next()
      .select(selectors.userPermissions)
      .next(permissions)
      .call(alternativeSaga)
      .next()
      .isDone();
  });
});
