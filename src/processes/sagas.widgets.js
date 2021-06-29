import { call, takeEvery, all } from 'redux-saga/effects';

import {
  actions as widgetsActions,
  sagas as widgetsSagas,
} from '@features/widgets';

import { exceptionHandlerSaga } from './sagas.errors';

/**
 * Загрузка данных виджета
 *
 * @returns {void}
 */
export function* loadWidgetsFlow() {
  try {
    // загружаем данные виджетов
    yield call(widgetsSagas.loadAllWidgetsSaga);
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Вотчер виджетов
 *
 * @returns {void}
 */
export function* widgetWatcher() {
  yield all([takeEvery(widgetsActions.loadWidgetsFlow, loadWidgetsFlow)]);
}
