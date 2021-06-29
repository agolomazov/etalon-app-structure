import { put, call } from 'redux-saga/effects';
import { callApi, convertFileToBase64 } from '@common/utils';

import { TECH_SUPPORT_MESSAGE_TYPES } from './constants';
import { api } from './api';
import { actions } from './ducks';

/**
 * Сага для отправки сообщения в тех. поддержку
 *
 * @param {string} messageType - тип сообщения
 * @param {object} messageBody - содержимое сообщения
 * @param {string} messageBody.subject - тема сообщения
 * @param {string} messageBody.text - текст сообщения
 * @param {string} messageBody.email - email
 * @param {File} messageBody.file - файл
 *
 * @returns {void}
 */
function* sendSupportMessageSaga(messageType, { subject, text, email, file }) {
  try {
    // показываем loader
    yield put(actions.startLoading());

    let convertedAttachment = '';
    if (file) {
      convertedAttachment = yield call(convertFileToBase64, file);
    }
    const attachment = {
      file: convertedAttachment,
      fileName: file?.name,
    };
    if (messageType === TECH_SUPPORT_MESSAGE_TYPES.SUPPORT) {
      yield call(callApi, api.sendTechSupportMessage, [
        {
          subject,
          text,
          email,
          file,
          attachment: file?.path ? attachment : undefined,
        },
      ]);
    }
    if (messageType === TECH_SUPPORT_MESSAGE_TYPES.FEEDBACK) {
      yield call(callApi, api.sendFeedbackMessage, [
        {
          subjectType: subject,
          text,
          email,
          file,
          attachment: file?.path ? attachment : undefined,
        },
      ]);
    }
  } finally {
    // показываем loader
    yield put(actions.stopLoading());
  }
}

export const sagas = {
  sendSupportMessageSaga,
};
