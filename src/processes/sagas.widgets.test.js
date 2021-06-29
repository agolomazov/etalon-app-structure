import { testSaga } from 'redux-saga-test-plan';

import { sagas as widgetsSagas } from '@features/widgets';

import { exceptionHandlerSaga } from './sagas.errors';

import { loadWidgetsFlow } from './sagas.widgets';

const error = new Error('Error');

describe('loadWidgetsFlow - загрузка данных виджетов главной страницы', () => {
  test('процесс выполняется успешно', () => {
    testSaga(loadWidgetsFlow)
      .next()
      .call(widgetsSagas.loadAllWidgetsSaga)
      .next()
      .isDone();
  });

  test('процесс корректно обрабатывает исключение', () => {
    testSaga(loadWidgetsFlow)
      .next()
      .throw(error)
      .call(exceptionHandlerSaga, error)
      .next()
      .isDone();
  });
});
