import { testSaga } from 'redux-saga-test-plan';
import DOMPurify from 'dompurify';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';
import { loadConsentToEdmTextSaga } from './sagas';

describe('loadConsentToEdmTextSaga - загружает текста согласия на ЭДО', () => {
  const edmText = '<test>test</test>';
  const sanitizedEdmText = '<test>test</test>';
  test('сага выполняется успешно, если есть согласие', () => {
    testSaga(loadConsentToEdmTextSaga)
      .next()
      .call(callApi, api.getConsentToEdmText)
      .next(edmText)
      .call([DOMPurify, DOMPurify.sanitize], edmText)
      .next(sanitizedEdmText)
      .put(actions.setConsentToEdmText(sanitizedEdmText))
      .next()
      .isDone();
  });
});
