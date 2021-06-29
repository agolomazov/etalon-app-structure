import axios from 'axios';
import qs from 'qs';

import { uuid4 } from '../strings';

/**
 * Метод создает URL
 *
 * @param {string} serviceName - название сервиса
 * @param {string} apiVersion - версия API
 * @param {string} url - URL
 *
 * @returns {string} Сформированный URL
 */
const constructUrl = (serviceName, apiVersion, url) =>
  serviceName && apiVersion ? `${serviceName}/api/${apiVersion}/${url}` : url;

/**
 * Метод создает и возращает объект axiosInstance
 *
 * @param {string} apiVersion - версия API
 * @param {string} serviceName - название сервиса
 *
 * @returns {object} объект axiosInstance
 */
// eslint-disable-next-line max-lines-per-function
export const createHttpClient = (serviceName = '', apiVersion = 'v1') => {
  /**
   * @ignore
   */
  const axiosInstance = axios.create({
    paramsSerializer: (queryParams) =>
      qs.stringify(queryParams, { arrayFormat: 'indices' }),
  });

  /**
   * ## Метод для отправки GET-запроса
   *
   * @example
   * get('URL_TO_BACKEND', {params: { search: 'Сбербанк' }});
   *
   * @param {string} url - URL эндпоинта для отправки запроса
   * @param {AxiosRequestConfig} config - Настройки для запроса
   * @param {string} version - Версия API
   * @param {object} headers - Заголовки для запроса
   *
   * @returns {AxiosPromise<any>} Результат ответа от сервера
   */
  const get = (url, config, version = apiVersion, headers = {}) =>
    axiosInstance.get(constructUrl(serviceName, version, url), {
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      ...config,
    });

  /**
   * ## Метод для отправки DELETE-запроса
   *
   * @example
   * deleteReq('URL_TO_BACKEND');
   *
   * @param {string} url - URL эндпоинта для отправки запроса
   * @param {Array<?Object>} data - данные запроса
   * @param {AxiosRequestConfig} config - Настройки для запроса
   * @param {string} version - Версия API
   * @param {object} headers - Заголовки для запроса
   *
   * @returns {AxiosPromise<any>} Результат ответа от сервера
   */
  const deleteReq = (url, data, config, version = apiVersion, headers = {}) =>
    axiosInstance.request({
      url: constructUrl(serviceName, version, url),
      method: 'delete',
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      data,
      ...config,
    });

  /**
   * ## Метод для отправки HEAD-запроса
   *
   * @example
   * head('URL_TO_BACKEND');
   *
   * @param {string} url - URL эндпоинта для отправки запроса
   * @param {AxiosRequestConfig} config - Настройки для запроса
   * @param {string} version - Версия API
   * @param {object} headers - Заголовки для запроса
   *
   * @returns {AxiosPromise<any>} Результат ответа от сервера
   */
  const head = (url, config, version = apiVersion, headers = {}) =>
    axiosInstance.head(constructUrl(serviceName, version, url), {
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      ...config,
    });

  /**
   * ## Метод для отправки POST-запроса
   *
   * @example
   * post('URL_TO_BACKEND', data);
   *
   * @param {string} url - URL эндпоинта для отправки запроса
   * @param {Array<?Object>} data - данные запроса
   * @param {Object} config - конфиг запроса
   * @param {string} version - Версия API
   * @param {object} headers - Заголовки для запроса
   *
   * @returns {AxiosPromise<any>} Результат ответа от сервера
   */
  const post = (url, data, config = {}, version = apiVersion, headers = {}) =>
    axiosInstance.request({
      url: constructUrl(serviceName, version, url),
      method: 'post',
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      data,
      ...config,
    });

  /**
   * ## Метод для отправки PUT-запроса
   *
   * @example
   * put('URL_TO_BACKEND', data,);
   *
   * @param {string} url - URL эндпоинта для отправки запроса
   * @param {Array<?Object>} data - данные запроса
   * @param {string} version - Версия API
   * @param {object} headers - Заголовки для запроса
   *
   * @returns {AxiosPromise<any>} Результат ответа от сервера
   */
  const put = (url, data, version = apiVersion, headers = {}) =>
    axiosInstance.request({
      url: constructUrl(serviceName, version, url),
      method: 'put',
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      data,
    });

  /**
   * ## Метод для отправки PATCH-запроса
   *
   * @example
   * patch('URL_TO_BACKEND', data);
   *
   * @param {string} url - URL эндпоинта для отправки запроса
   * @param {Array<?Object>} data - данные запроса
   * @param {string} version - Версия API
   * @param {object} headers - Заголовки для запроса
   *
   * @returns {AxiosPromise<any>} Результат ответа от сервера
   */
  const patch = (url, data, version = apiVersion, headers = {}) =>
    axiosInstance.request({
      url: constructUrl(serviceName, version, url),
      method: 'patch',
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      data,
    });

  /**
   * @ignore
   */
  return {
    get,
    delete: deleteReq,
    head,
    post,
    put,
    patch,
  };
};
