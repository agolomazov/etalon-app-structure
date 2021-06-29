import { call, put } from 'redux-saga/effects';
import DOMPurify from 'dompurify';

import { callApi } from '@common/utils';
import { withPermission, PERMISSIONS } from '@common/modules/user';

import { api } from './api';
import { actions } from './ducks';

/**
 * Сага для загрузки текста согласия на ЭДО
 *
 * @returns {void}
 */
export function* loadConsentToEdmTextSaga() {
  // отправляем запрос на бекенд, получаем html согласия на ЭДО
  const consentToEdmText = yield call(callApi, api.getConsentToEdmText);

  // очищаем html
  const sanitizedConsentToEdmText = yield call(
    [DOMPurify, DOMPurify.sanitize],
    consentToEdmText,
  );

  // кладем полученные данные в стор
  yield put(actions.setConsentToEdmText(sanitizedConsentToEdmText));
}

export const sagas = {
  loadConsentToEdmTextSaga: withPermission({
    permission: PERMISSIONS.edo.edoConsent,
    saga: loadConsentToEdmTextSaga,
  }),
};
