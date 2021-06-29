import { call, put, select, all } from 'redux-saga/effects';

import { callApi, convertFileToBase64 } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';
import { selectors } from './selectors';
import { setSortMessagesList, fixUrl, isAppeal } from './utils';
import { APPEAL_STATUS } from './constants';

/**
 * Сага для загрузки списка обращений
 *
 * @returns {void}
 */
function* loadAppealsSaga() {
  // отправляем запрос на бекенд, получаем список обращений
  const appeals = yield call(callApi, api.getAppeals, [], ['data', 'appeals']);

  // кладем полученные данные в стор
  yield put(actions.setAppeals(appeals));
}

/**
 * Сага для загрузки списка обращений по договору
 *
 * @param {string} contractId - идентификатор договора
 *
 * @returns {void}
 */
function* loadContractAppealsSaga(contractId) {
  // загружаем список обращений для договра
  const contractAppeals = yield call(
    callApi,
    api.getAppealsByContract,
    [contractId],
    ['data', 'appeals'],
  );

  // сортируем список обращений
  const sortedAppeals = yield call(setSortMessagesList, contractAppeals);

  // кладем полученные данные в стор
  yield put(actions.setContractAppeals(sortedAppeals));
}

/**
 * Сага для загрузки комментариев к обращению
 *
 * @returns {void}
 */
function* loadAppealCommentsSaga() {
  const id = yield select(selectors.currentAppealId);
  // отправляем запрос на бекенд, получаем список комментариев
  const comments = yield call(
    callApi,
    api.getAppealComments,
    [id],
    ['data', 'comments'],
  );
  // кладем полученные данные в стор
  yield put(actions.setAppealComments(comments));
}

/**
 * Сага для загрузки обращения
 *
 * @param {string} appealId - Id обращения
 *
 * @returns {void}
 */
function* loadAppealSaga(appealId) {
  const appeals = yield select(selectors.appealsList) || [];
  const appeal = appeals.find((el) => String(el.id) === String(appealId));
  if (!appeal) {
    yield put(actions.setAppeal(null));
    return;
  }

  const { href, type } = appeal;

  const appealData = yield call(callApi, api.getAppeal, [fixUrl(href)]);
  yield put(actions.setAppeal(appealData));

  if (isAppeal(type)) {
    yield call(loadAppealCommentsSaga);
  }
}

/**
 * Отправка сообщения или отзыва
 *
 * @returns {void}
 */
export function* sendMessageSaga() {
  const feedback = yield select(selectors.feedback);
  const comment = yield select(selectors.comment);
  const appealStatus = yield select(selectors.currentAppealStatus);

  if (feedback !== null && appealStatus === APPEAL_STATUS.FINAL_ANSWER) {
    // отправляем оценку на бэкэнд
    yield call(callApi, api.setAppealFeedback, [feedback], ['data']);
    // обновляем список обращений - данные о фидбэке хранятся в нем
  }
  if (
    comment !== null &&
    appealStatus === APPEAL_STATUS.ADDITIONAL_INFO_REQUESTED
  ) {
    const { body, appealId } = comment;
    let convertetdAttachments = [];
    // eslint-disable-next-line max-depth
    if (comment.attachments.length > 0) {
      convertetdAttachments = yield all(
        comment.attachments.map((el) => call(convertFileToBase64, el)),
      );
    }
    const attachments = comment.attachments.map((el, index) => {
      const attachment = {
        fileName: el.path,
        file: convertetdAttachments[index],
      };
      return attachment;
    });
    const newComment = {
      body,
      attachments,
      appealId,
    };
    // отправляем новый комментарий на бэкэнд
    yield call(callApi, api.setAppealComment, [newComment], ['data']);
  }
}

/**
 * Обновление обращения и списка обращений
 *
 * @returns {void}
 */
export function* updateAppealSaga() {
  const href = yield select(selectors.currentAppealHref);
  yield call(loadAppealsSaga);
  yield call(loadAppealSaga, fixUrl(href));
}

export const sagas = {
  loadAppealsSaga,
  loadContractAppealsSaga,
  loadAppealCommentsSaga,
  loadAppealSaga,
  updateAppealSaga,
  sendMessageSaga,
};
