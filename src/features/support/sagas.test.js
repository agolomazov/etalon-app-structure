import { testSaga } from 'redux-saga-test-plan';
import { callApi, convertFileToBase64 } from '@common/utils';

import { TECH_SUPPORT_MESSAGE_TYPES } from './constants';
import { actions } from './ducks';
import { sagas } from './sagas';
import { api } from './api';

describe('sendSupportMessageSaga - Сага для отправки сообщения в тех. поддержку и отзыв о работе ЛК', () => {
  const subject = 'subject';
  const text = 'text';
  const email = 'email';
  const file = { name: 'file.pdf', path: 'http' };
  const convertedAttachment = 'adf23';
  const attachment = { file: 'adf23', fileName: file.name };

  test('Сага отрабатывает запрос к API на отправку отзыва', () => {
    testSaga(
      sagas.sendSupportMessageSaga,
      TECH_SUPPORT_MESSAGE_TYPES.FEEDBACK,
      {
        subject,
        text,
        email,
        file,
      },
    )
      .next()
      .put(actions.startLoading())
      .next()
      .call(convertFileToBase64, file)
      .next(convertedAttachment)
      .call(callApi, api.sendFeedbackMessage, [
        {
          subjectType: subject,
          text,
          email,
          file,
          attachment: file?.path ? attachment : undefined,
        },
      ])
      .next()
      .put(actions.stopLoading())
      .next()
      .isDone();
  });
  test('Сага отрабатывает запрос к API на отправку сообщения в поддержку', () => {
    testSaga(sagas.sendSupportMessageSaga, TECH_SUPPORT_MESSAGE_TYPES.SUPPORT, {
      subject,
      text,
      email,
      file,
    })
      .next()
      .put(actions.startLoading())
      .next()
      .call(convertFileToBase64, file)
      .next(convertedAttachment)
      .call(callApi, api.sendTechSupportMessage, [
        {
          subject,
          text,
          email,
          file,
          attachment: file?.path ? attachment : undefined,
        },
      ])
      .next()
      .put(actions.stopLoading())
      .next()
      .isDone();
  });
});
