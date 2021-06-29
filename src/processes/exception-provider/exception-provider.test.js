import { testSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';

import { APP_ROUTES, ROSIM_URL } from '@src/constants';
import {
  AuthError,
  ServerError,
  AccessDeniedError,
  ArlkError,
} from '@common/errors';

import { actions as errorActions } from '@features/errors';
import {
  NoActiveCompanyError,
  UnconfirmedUserError,
} from '@common/modules/user';

import { getExceptionHandler } from './index';

describe('getExceptionHandler - провайдер исключений', () => {
  test('Сага должна делать редирект на страницу авторизации, если возникает AuthError', () => {
    const authError = new AuthError();

    const saga = getExceptionHandler(authError);

    testSaga(saga, authError)
      .next()
      .call([window.location, window.location.replace], ROSIM_URL)
      .next()
      .isDone();
  });

  test('Сага должна делать редирект на страницу авторизации, если возникает NoActiveCompanyError', () => {
    const noActiveCompanyError = new NoActiveCompanyError();

    const saga = getExceptionHandler(noActiveCompanyError);

    testSaga(saga, noActiveCompanyError)
      .next()
      .call([window.location, window.location.replace], ROSIM_URL)
      .next()
      .isDone();
  });

  test('Сага должна делать редирект на страницу ошибки пользователя, если возникает UnconfirmedUserError', () => {
    const unconfirmedUserError = new UnconfirmedUserError();

    const saga = getExceptionHandler(unconfirmedUserError);

    testSaga(saga, unconfirmedUserError)
      .next()
      .put(push(APP_ROUTES.UNCONFIRMED_USER))
      .next()
      .isDone();
  });

  test('Сага должна делать редирект на страницу ошибки прав доступа пользователя, если возникает AccessDeniedError', () => {
    const accessDeniedError = new AccessDeniedError();

    const saga = getExceptionHandler(accessDeniedError);

    testSaga(saga, accessDeniedError)
      .next()
      .put(push(APP_ROUTES.ACCESS_DENIED))
      .next()
      .isDone();
  });

  test('Сага должна делать редирект на страницу "Не арендатора", если возникает ARLK-0021', () => {
    const notATenantError = new ArlkError({ errorCode: 'ARLK-0021' });
    const saga = getExceptionHandler(notATenantError);

    testSaga(saga, notATenantError)
      .next()
      .put(push(APP_ROUTES.NOT_A_TENANT))
      .next()
      .isDone();
  });

  test('Сага должна уметь обрабатывать ARLK-ошибки дефолтным способом', () => {
    const arlkError = new ArlkError({
      errorCode: 'ARLK-ANYCODE',
      errorTitle: 'any title',
      errorMessage: 'any message',
    });
    const saga = getExceptionHandler(arlkError);

    testSaga(saga, arlkError)
      .next()
      .put(
        errorActions.setError({
          isFatal: true,
          code: arlkError.errorCode,
          title: arlkError.errorTitle,
          message: arlkError.errorMessage,
        }),
      )
      .next()
      .isDone();
  });

  test('Сага должна положить данные об ошибки в стор, если возникает ServerError', () => {
    const serverError = new ServerError('500 server error', 500);
    const errorPayload = {
      isFatal: true,
      message: serverError.message,
      code: serverError.code,
    };

    const saga = getExceptionHandler(serverError);

    testSaga(saga, serverError)
      .next()
      .put(errorActions.setError(errorPayload))
      .next()
      .isDone();
  });

  test('Сага должна положить данные об ошибки в стор, если возникает неизвестная ошибка', () => {
    const unknownError = new Error('unknown error');
    const errorPayload = {
      isFatal: false,
      message: unknownError.message,
      code: 0,
      title: 'Ошибка',
    };

    const saga = getExceptionHandler(unknownError);

    testSaga(saga, unknownError)
      .next()
      .put(errorActions.setError(errorPayload))
      .next()
      .isDone();
  });
});
