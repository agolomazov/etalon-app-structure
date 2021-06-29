import { call, select } from 'redux-saga/effects';
import { selectors } from './selectors';
/**
 * Проверяет есть ли необходимый premission для выполнения саги,
 * и вызывает новую сагу
 * @param {string} permission - permission необходимый для запуска саги
 * @param {function} saga - сага
 * @param {function} alternativeSaga - альтернативная сага(опционально)
 *
 * @returns {function} новая сага
 */
export function withPermission({ permission, saga, alternativeSaga }) {
  return function* newSaga(...params) {
    const userPermissions = yield select(selectors.userPermissions);
    const hasPermission = userPermissions.includes(permission);

    if (hasPermission) {
      yield call(saga, ...params);
    } else if (alternativeSaga) {
      yield call(alternativeSaga, ...params);
    }
  };
}
