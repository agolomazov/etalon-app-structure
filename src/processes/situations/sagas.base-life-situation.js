import {
  call,
  put,
  all,
  takeEvery,
  take,
  fork,
  cancel,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { APP_ROUTES } from '@src/constants';
import { getUiMessages } from '@common/messages';
import { callApi } from '@common/utils';

import { actions as noticesActions } from '@features/notices';

import {
  api as situationsApi,
  actions as situationsActions,
  sagas as situationsSagas,
} from '@features/situations';

import { exceptionHandlerSaga } from '../sagas.errors';

const { attachments: attachmentsSagas } = situationsSagas;
const { attachments: attachmentsActions } = situationsActions;

/**
 * Запускаем процесс создание жизненной ситуации
 *
 * @returns {void}
 */
export function* startCreateLifeSituationFlow({
  payload: { lifeSituationType, afterCreateLifeSituationAction },
}) {
  try {
    // показываем loader
    yield put(situationsActions.startLoading());

    // отправляем запрос на создание ЖС
    const situationLifeId = yield call(
      callApi,
      situationsApi.createLifeSituation,
      [lifeSituationType],
      ['data', 'id'],
    );

    // кладем тип ЖС в стор
    yield put(situationsActions.setLifeSituationType(lifeSituationType));
    // кладем Id ЖС в стор
    yield put(situationsActions.setLifeSituationId(situationLifeId));

    // оповещаем, что ЖС успешно создана
    if (afterCreateLifeSituationAction) {
      yield put(afterCreateLifeSituationAction());
    }
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  } finally {
    // завершаем процесс создания ЖС
    if (!afterCreateLifeSituationAction) {
      yield put(situationsActions.completeCreateLifeSituationFlow());
    }
  }
}

/**
 * Завершаем процесс создание жизненной ситуации
 *
 * @returns {void}
 */
export function* completeCreateLifeSituationFlow() {
  yield put(situationsActions.stopLoading());
}

/**
 * Выход из жизненной ситуации
 *
 * @returns {void}
 */
export function* exitLifeSituationFlow({
  payload: { beforeExitLifeSituationAction },
}) {
  try {
    if (beforeExitLifeSituationAction) {
      yield put(beforeExitLifeSituationAction());
    }
    // очищаем стор
    yield put(attachmentsActions.reset());
    yield put(situationsActions.reset());
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Процесс - прикрепить файл к обращению
 *
 * @param {object} action - экшен
 *
 * @returns {void}
 */
export function* attachAppealFileFlow(action) {
  try {
    yield call(attachmentsSagas.attachAppealFileSaga, action);
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Процесс - удалить файл по обращению
 *
 * @param {object} action - экшен
 *
 * @returns {void}
 */
export function* deleteAppealFileFlow(action) {
  try {
    yield call(attachmentsSagas.deleteAppealFileSaga, action);
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Процесс скачивания печатной формы
 *
 * @param {object} action - экшен
 *
 * @returns {void}
 */
export function* downloadFormFlow({ payload }) {
  try {
    yield call(situationsSagas.downloadFormSaga, payload);
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Процесс для отправки обращения
 *
 * @param {object} action - экшен
 *
 * @returns {void}
 */
export function* submitLifeSituationFlow({ payload }) {
  try {
    // сохраняем данные по анкетам
    const appeals = yield call(situationsSagas.saveAppealSaga, payload);

    // показываем уведомление
    yield all(
      appeals.map(({ title }) =>
        put(
          noticesActions.showNotice({
            text: getUiMessages('notifyAppealSentSuccess')(title),
          }),
        ),
      ),
    );

    // id обращения
    const appealId = appeals?.[0]?.id;

    // редирект
    yield put(
      push(
        appealId ? APP_ROUTES.MESSAGES_APPEAL(appealId) : APP_ROUTES.MESSAGES,
      ),
    );
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Метод оборачивает сагу в try..catch
 *
 * @param {function} saga - сага
 *
 * @returns {function} новая сага
 */
export function withErrorHandling(saga) {
  return function* sagaFlow(...params) {
    try {
      // запускаем сагу
      yield call(saga, ...params);
    } catch (error) {
      // запускаем обработчик ошибки
      yield call(exceptionHandlerSaga, error);
    }
  };
}

/**
 * Метод оборачивает сагу в try..catch и добавляет вызов situationsActions.completeCreateLifeSituationFlow
 *
 * @param {function} saga - сага
 *
 * @returns {function} новая сага
 */
export function withCompleteCreateLifeSituation(saga) {
  return function* sagaFlow(...params) {
    try {
      // вызываем сагу
      if (saga) {
        yield call(saga, ...params);
      }
    } catch (error) {
      // Запускаем обработчик ошибки
      yield call(exceptionHandlerSaga, error);
    } finally {
      // завершаем процесс создания ЖС
      yield put(situationsActions.completeCreateLifeSituationFlow());
    }
  };
}

/**
 * @typedef {object} ProcessDefinition
 * @property {function} action - Экшн процесса
 * @property {function} process - Сага процесса
 */
/**
 * Создает вотчер для ЖС
 *
 * @example
 * registrationLifeSituation({
 *    startProcess: {
 *      action: reconcilActions.afterCreateLifeSituationFlow,
 *      process: createLifeSituationFlow,
 *    },
 *    exitProcess: {
 *      action: reconcilActions.beforeExitLifeSituationFlow,
 *      process: exitLifeSituationFlow,
 *    },
 *    subProcesses: [
 *      {
 *        action: reconcilActions.chooseAppealTypeFlow,
 *        process: chooseAppealTypeFlow,
 *      },
 *      {
 *        action: reconcilActions.createAppealFlow,
 *        process: createAppealFlow,
 *      },
 *      {
 *        action: reconcilActions.deleteAppealFlow,
 *        process: deleteAppealFlow,
 *      },
 *    ],
 *  })
 *
 * @param {object} params - Параметры
 * @param {ProcessDefinition} params.startProcess - Процесс создания ЖС
 * @param {ProcessDefinition} params.exitProcess - Процесс выхода из ЖС
 * @param {Array<ProcessDefinition>} params.subProcesses - Процессы ЖС
 *
 * @returns {function} - вотчер для ЖС
 */
export function registrationLifeSituation({
  startProcess,
  exitProcess,
  subProcesses = [],
} = {}) {
  return function* sagaWatcher() {
    while (true) {
      // оборачиваем саги процессов в try...catch
      const processes = subProcesses.map(({ action, process }) =>
        takeEvery(action, withErrorHandling(process)),
      );

      // оборачиваем сагу процесса создания ЖС в try...catch и добовляем вызов situationsActions.completeCreateLifeSituationFlow
      if (startProcess) {
        processes.push(
          takeEvery(
            startProcess.action,
            withCompleteCreateLifeSituation(startProcess.process),
          ),
        );
      }

      // запускаем процессы ЖС
      const tasks = yield all(processes);

      // ждем экшн на выход из ЖС
      const action = yield take(exitProcess.action);

      // отменяем процессы ЖС
      yield cancel(tasks);

      // выполняем выход из ЖС
      yield fork(withErrorHandling(exitProcess.process), action);
    }
  };
}

/**
 * Вотчер для процессов ЖС
 *
 * @returns {void}
 */
export function* baseLifeSituationWatcher() {
  while (true) {
    const createAction = yield take(situationsActions.createLifeSituationFlow);
    const createTask = yield fork(startCreateLifeSituationFlow, createAction);

    const completeCreateTask = yield takeEvery(
      situationsActions.completeCreateLifeSituationFlow,
      completeCreateLifeSituationFlow,
    );

    const tasks = yield all([
      takeEvery(attachmentsActions.attachAppealFileFlow, attachAppealFileFlow),
      takeEvery(attachmentsActions.deleteAppealFileFlow, deleteAppealFileFlow),
      takeEvery(situationsActions.downloadFormFlow, downloadFormFlow),
      takeEvery(
        situationsActions.submitLifeSituationFlow,
        submitLifeSituationFlow,
      ),
    ]);

    const exitAction = yield take(situationsActions.exitLifeSituationFlow);

    yield cancel([createTask, completeCreateTask, ...tasks]);

    yield fork(exitLifeSituationFlow, exitAction);
  }
}
