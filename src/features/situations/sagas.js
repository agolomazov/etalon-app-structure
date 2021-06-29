import { call, select, put, all } from 'redux-saga/effects';

import { callApi, downloadFile, addDateToFileName } from '@common/utils';

import { sagas as attachmentsSagas } from './modules/attachments';

import { api } from './api';
import { actions } from './ducks';
import { selectors } from './selectors';
import { FILE_NAME_MAP } from './constants';

/**
 * Создание обращения
 *
 * @example yield call( createAppealSaga, SITUATION_APPEAL_TYPES.SCANNED_ACT )
 *
 * @param {string} appealType - Тип обращения
 *
 * @returns {number} Id обращения
 */
function* createAppealSaga(appealType) {
  const lifeSituationType = yield select(selectors.lifeSituationType);
  const lifeSituationId = yield select(selectors.lifeSituationId);

  // отправляем запрос на создание обращения
  const appealId = yield call(
    callApi,
    api.createAppeal,
    [lifeSituationType, lifeSituationId, appealType],
    ['data', 'id'],
  );

  return appealId;
}

/**
 * Удаление обращения
 *
 * @example yield call( deleteAppealSaga, '001' )
 *
 * @param {number} appealId - Id обращения
 *
 * @returns {void}
 */
function* deleteAppealSaga(appealId) {
  const lifeSituationId = yield select(selectors.lifeSituationId);

  // отправляем запрос на удаление обращения
  yield call(callApi, api.deleteAppeal, [lifeSituationId, appealId]);
}

/**
 * Сохранение обращений
 *
 * @example yield call( saveAppealSaga,
 *                      {
 *                        appealIds: ['c198de78-316c-11eb-adc1-0242ac120002'],
 *                        appealType: SITUATION_APPEAL_TYPES.SCANNED_ACT,
 *                        appealSelector: selectors.appeal,
 *                        appealMapper: appealMapper,
 *                      })
 *
 * @param {object} params - Параметры саги
 * @param {Array<string>} params.appealIds - Список идентификаторов обращений, которые будут отправляться на сервер
 * @param {string} params.appealType - Тип обращений, одно из SITUATION_APPEAL_TYPES
 * @param {Function} params.appealSelector - Селектор, который возвращает данные по обращению
 * @param {Function} params.appealMapper - Функция-маппер, преоразует данные по обращениям в серверный формат
 *
 * @returns {object} ответ от сервера
 */
function* saveAppealSaga({
  appealIds = [],
  appealType,
  appealSelector,
  appealMapper,
}) {
  try {
    // показываем loader
    yield put(actions.startLoading());

    // получаем данные по ЖС и обращению
    const lifeSituationType = yield select(selectors.lifeSituationType);
    const lifeSituationId = yield select(selectors.lifeSituationId);
    const appealData = yield select(appealSelector);

    // получаем список файлов, которые прикреплены к обращениям
    const files = yield all(
      appealIds.map((appealId) =>
        call(attachmentsSagas.getFilesByAppealIdSaga, appealId),
      ),
    );

    // преобразование
    const appealDataDto = appealMapper
      ? appealMapper({
          appealData,
          appealType,
          appealFilesGroupedByAppealId: Object.fromEntries(
            appealIds.map((appealId, index) => [appealId, files[index]]),
          ),
        })
      : appealData;

    // отправляем запрос на сохранение обращения/обращений
    const { appeals = [] } = yield call(callApi, api.saveAppeal, [
      lifeSituationType,
      lifeSituationId,
      appealType,
      appealDataDto,
    ]);

    return appeals;
  } finally {
    // скрываем loader
    yield put(actions.stopLoading());
  }
}

/**
 * Скачать печатную форму
 *
 * @example
 * yield call( downloadFormSaga,
 *            {
 *              appealType: SITUATION_APPEAL_TYPES.OVERPAYMENT_TRANSFER,
 *              appealId: 1,
 *              formType: SITUATION_FORM_TYPES.OVERPAYMENT_APPEAL_DOCUMENT,
 *              formSelector: selectors.form,
 *              formMapper
 *            })
 *
 * @param {object} params - Параметры саги
 * @param {string} params.appealType - Тип обращений, одно из SITUATION_APPEAL_TYPES
 * @param {number|string} params.appealId - Id обращения
 * @param {string} params.formType - Тип формы, одно из SITUATION_FORM_TYPES
 * @param {Function} params.formSelector - Селектор, который возвращает данные по форме
 * @param {Function} params.formMapper - Функция-маппер, преоразует данные по форме в серверный формат
 *
 * @returns {object} ответ от сервера
 */
function* downloadFormSaga({
  appealType,
  appealId,
  formType,
  formSelector,
  formMapper,
}) {
  try {
    // показываем loader скачивания печатной формы
    yield put(actions.startDownloadFormLoading());
    // получаем данные по ЖС и обращению
    const lifeSituationType = yield select(selectors.lifeSituationType);
    const lifeSituationId = yield select(selectors.lifeSituationId);
    const formData = yield select(formSelector);

    // преобразование
    const formDataDto = formMapper
      ? formMapper({ formData, appealType })
      : formData;

    // отправляем запрос на сохранение обращения/обращений
    const data = yield call(callApi, api.downloadForm, [
      {
        lifeSituationType,
        lifeSituationId,
        appealType,
        appealId,
        formType,
        formData: formDataDto,
      },
    ]);

    // скачиваем форму
    yield call(
      downloadFile,
      data,
      addDateToFileName(
        FILE_NAME_MAP[appealType].fileName,
        FILE_NAME_MAP[appealType].fileExtension,
      ),
    );
  } finally {
    // скрываем loader скачивания печатной формы
    yield put(actions.stopDownloadFormLoading());
  }
}

/**
 * Фабричный метод. Создает сагу для создания обращения
 *
 * @example createAppealSagaFactory(
 *                                  SITUATION_APPEAL_TYPES.CONTRACT_MISSED,
 *                                  { addAppeal : actions.addAppeal})
 *
 * @param {string|function} appealType - Тип обращения или сага, которая возвращает тип обращения
 * @param {object} config - Конфигурация
 * @param {function} config.startLoading - Action для показа loader'а
 * @param {function} config.stopLoading - Action для скрытия loader'а
 * @param {function} config.addAppeal - Action, который будет вызван после создания обращения,
 * в качестве payload'а будет передан Id обращения
 *
 * @returns {object} Сага для создания обращения
 */
const createAppealSagaFactory = (
  appealType,
  { startLoading, stopLoading, addAppeal } = {},
) =>
  function* saga() {
    try {
      // показываем loader
      if (startLoading) {
        yield put(startLoading());
      }

      // получаем тип обращения
      const appType =
        typeof appealType === 'string' ? appealType : yield call(appealType);

      // создание обращения
      const appealId = yield call(createAppealSaga, appType);

      // кладем обращение в стор
      if (addAppeal) {
        yield put(addAppeal(appealId));
      }
    } finally {
      // скрываем loader
      if (stopLoading) {
        yield put(stopLoading());
      }
    }
  };

/**
 * Фабричный метод. Создает сагу для удаления обращения
 *
 * @example deleteAppealSagaFactory({ deleteAppeal : actions.deleteAppeal})
 *
 * @param {object} config - Конфигурация
 * @param {function} config.startLoading - Action для показа loader'а
 * @param {function} config.stopLoading - Action для скрытия loader'а
 * @param {function} config.deleteAppeal - Action, который будет вызван после создания обращения,
 * в качестве payload'а будет передан Id обращения
 *
 * @returns {object} сага для удаления обращения
 */
const deleteAppealSagaFactory = ({
  startLoading,
  stopLoading,
  deleteAppeal,
} = {}) =>
  function* saga(appealId) {
    try {
      // показываем loader
      if (startLoading) {
        yield put(startLoading({ appealId }));
      }

      // отправляем запрос удалить обращение на сервер
      yield call(deleteAppealSaga, appealId);

      // удаляем обращение из стора
      if (deleteAppeal) {
        yield put(deleteAppeal(appealId));
      }
    } finally {
      // скрываем loader
      if (stopLoading) {
        yield put(stopLoading({ appealId }));
      }
    }
  };

export const sagas = {
  createAppealSaga,
  deleteAppealSaga,
  saveAppealSaga,
  downloadFormSaga,
  createAppealSagaFactory,
  deleteAppealSagaFactory,
};
