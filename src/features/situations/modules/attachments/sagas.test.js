import { testSaga } from 'redux-saga-test-plan';

import { callApi, convertFileToBase64 } from '@common/utils';

import { api } from '../../api';

import { actions } from './ducks';
import { sagas } from './sagas';
import { selectors } from './selectors';

describe('attachAppealFileSaga - сага прикрепляет файл к обращению', () => {
  test('Сага отрабатывает запрос к API на прикрепление файла к обращению и кладет результат в стор', () => {
    const uniq = 1;
    const appealId = 1;
    const fileToUpload = { name: 'file.pdf' };
    const fileDataB64 = 'file.pdf in base64';
    const fileInfo = { id: '1', size: 100 };

    testSaga(sagas.attachAppealFileSaga, {
      payload: { uniq, appealId, fileToUpload },
    })
      .next()
      .put(actions.startUploading(uniq))
      .next()
      .call(convertFileToBase64, fileToUpload)
      .next(fileDataB64)
      .call(callApi, api.attachAppealFile, [
        {
          appealId,
          file: fileDataB64,
          fileName: fileToUpload.name,
        },
      ])
      .next(fileInfo)
      .put(
        actions.addFile({
          appealId,
          fileInfo,
          fileToUpload,
        }),
      )
      .next()
      .put(
        actions.addLinkToFile({
          linkId: undefined,
          appealId,
          fileId: fileInfo.id,
        }),
      )
      .next()
      .put(actions.stopUploading(uniq))
      .next()
      .isDone();
  });
});

describe('deleteAppealFileSaga - сага удаляет файл по обращению', () => {
  test('Сага отрабатывает запрос к API на удалениее файла по обращению и кладет результат в стор', () => {
    const appealId = 1;
    const fileId = 1;

    testSaga(sagas.deleteAppealFileSaga, {
      payload: { appealId, fileId },
    })
      .next()
      .put(actions.startLoading({ appealId, fileId }))
      .next()
      .call(callApi, api.deleteAppealFile, [appealId, fileId])
      .next()
      .put(actions.deleteFile({ appealId, fileId }))
      .next()
      .put(actions.stopLoading({ appealId, fileId }))
      .next()
      .isDone();
  });
});

describe('getFilesByAppealIdSaga - сага получает файлы по идентификатору обращения', () => {
  test('сага получает файлы по идентификатору обращения', () => {
    const appealIds = ['appealId1', 'appealId2'];
    const fileIds = ['fileId1', 'fileId2'];
    const linkIds = ['linkId1', 'linkId2'];

    const filesByAppealId = {
      [fileIds[0]]: {
        id: fileIds[0],
      },
      [fileIds[1]]: {
        id: fileIds[1],
      },
    };

    const linksToFiles = {
      [linkIds[0]]: {
        fileId: fileIds[0],
        appealId: appealIds[0],
      },
      [linkIds[1]]: {
        fileId: fileIds[1],
        appealId: appealIds[1],
      },
    };

    const appealId = appealIds[0];

    testSaga(sagas.getFilesByAppealIdSaga, appealId)
      .next()
      .select(selectors.filesByAppealId, appealId)
      .next(filesByAppealId)
      .select(selectors.linksToFiles)
      .next(linksToFiles)
      .returns([
        { fileId: fileIds[0], linkId: linkIds[0] },
        { fileId: fileIds[1] },
      ]);
  });
});
