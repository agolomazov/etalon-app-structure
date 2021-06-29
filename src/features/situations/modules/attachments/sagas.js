import { call, put, select } from 'redux-saga/effects';

import { callApi, convertFileToBase64 } from '@common/utils';

import { api } from '../../api';

import { actions } from './ducks';
import { selectors } from './selectors';

/**
 * Прикрепить файл к обращению
 *
 * @param {object} action - экшен
 * @param {object} action.payload - полезная нагрузка экшена
 * @param {string|number} action.payload.uniq - уникальное значение
 * @param {string} action.payload.linkId - пользовательский идентификатор, который будет добавлен в стор
 * @param {string} action.payload.appealId - Id обращения
 * @param {File} action.payload.fileToUpload - прикрепляемый файл
 *
 * @returns {void}
 */
function* attachAppealFileSaga({
  payload: { uniq, linkId, appealId, fileToUpload },
}) {
  try {
    // показываем loader
    yield put(actions.startUploading(uniq));

    // файл в base64
    const fileDataB64 = yield call(convertFileToBase64, fileToUpload);

    // отправляем файл на BE
    const fileInfo = yield call(callApi, api.attachAppealFile, [
      {
        appealId,
        file: fileDataB64,
        fileName: fileToUpload.name,
      },
    ]);

    // кладем прикрепленный файл в стор
    yield put(
      actions.addFile({
        appealId,
        fileInfo,
        fileToUpload,
      }),
    );

    // добавляем ссылку на прикрепленный файл
    yield put(
      actions.addLinkToFile({
        linkId,
        appealId,
        fileId: fileInfo.id,
      }),
    );
  } finally {
    // скрываем loader
    yield put(actions.stopUploading(uniq));
  }
}

/**
 * Удалить файл по обращению
 *
 * @param {object} action - экшен
 * @param {object} action.payload - полезная нагрузка экшена
 * @param {string|number} action.payload.appealId - Id обращения
 * @param {string|number} action.payload.fileId - Id прикрепленного файла
 *
 * @returns {void}
 */
function* deleteAppealFileSaga({ payload: { appealId, fileId, linkId } }) {
  try {
    // показываем loader
    yield put(actions.startLoading({ appealId, fileId }));

    // отправляем запрос на удаление файла
    yield call(callApi, api.deleteAppealFile, [appealId, fileId]);

    // удаляем файл из стора
    yield put(actions.deleteFile({ appealId, fileId }));

    // удаляем ссылку на файл из стора
    if (linkId) {
      yield put(actions.deleteLinkToFile(linkId));
    }
  } finally {
    // скрываем loader
    yield put(actions.stopLoading({ appealId, fileId }));
  }
}

/**
 * @typedef {object} FileIdAndLinkId
 * @property {string} fileId - идентификатор файла
 * @property {string} linkId - идентификатор ссылки
 */
/**
 * Получить файлы по идентификатору обращения
 *
 * @param {string} appealId - идентификатор обращения
 *
 * @returns {Array<FileIdAndLinkId>} результат
 */
function* getFilesByAppealIdSaga(appealId) {
  // объект с загруженными файлами для обращения
  const filesMapByAppealId =
    (yield select(selectors.filesByAppealId, appealId)) || {};

  // ссылки на файлы
  const linksToFiles = yield select(selectors.linksToFiles);

  /*
   * ссылки на файлы для обращения
   * {
   *   [fileId] : linkId,
   *   [fileId] : linkId,
   * }
   */
  const linksToFilesMapByFileId = Object.entries(linksToFiles).reduce(
    (acc, [linkId, { appealId: currentAppealId, fileId }]) => {
      if (currentAppealId === appealId) {
        acc[fileId] = linkId;
      }
      return acc;
    },
    {},
  );

  /*
   * массив прикрепленных файлов к обращению
   * [ {fileId, linkId}, {fileId, linkId} ]
   */
  return Object.values(filesMapByAppealId).map(({ id: fileId }) => {
    const linkId = linksToFilesMapByFileId[fileId];
    return linkId ? { fileId, linkId } : { fileId };
  });
}

export const sagas = {
  attachAppealFileSaga,
  deleteAppealFileSaga,
  getFilesByAppealIdSaga,
};
