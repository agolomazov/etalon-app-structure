import { call } from 'redux-saga/effects';
import { pathOr } from 'ramda';
import {
  AuthError,
  ServerError,
  AccessDeniedError,
  ArlkError,
} from '../../errors';

/**
 * Обертка над функцией отправки API запроса
 *
 * @param {function} command - метод вызова API
 * @param {any} params - параметры команды
 * @param {array<string>} - путь к данным для выдачи данных
 * @param {array<string>} - путь к данными для получения ошибок
 *
 * @returns {any|Error} - ответ от сервера или выбросится ошибка
 */
// eslint-disable-next-line
export function* callApi(
  command,
  params = [],
  pathData = ['data'],
  pathError = ['data', 'err'],
) {
  try {
    const response = yield call(command, ...params);
    const responseError = pathOr(null, pathError, response);
    const responseData = pathOr(null, pathData, response);

    // Если вернулась ошибка то выбрасываем исключение
    if (responseError && responseError.message) {
      throw new Error(responseError.message);
    }

    return responseData;
  } catch (error) {
    if (error?.response?.status === 401) {
      throw new AuthError();
    }
    if (error?.response?.status === 403) {
      throw new AccessDeniedError('', error.response.status);
    }
    if (error?.response?.status === 400 && error.response.data) {
      const { code, message, title } = error.response.data;
      throw new ArlkError({
        errorCode: code,
        errorMessage: message,
        errorTitle: title,
      });
    }
    if (error?.response?.status >= 400) {
      throw new ServerError('', error.response.status);
    }

    throw new Error((error && error.message) || 'Unknown error');
  }
}
