import { ENV_MODE } from '../constants';

/**
 * Получить режим окружения
 *
 * @example
 * envMode()
 */
export const envMode = () => Cypress.env('mode');

/**
 * Проверить, что режим окружения равен ENV_MODE.DEV
 *
 * @example
 * isEnvModeDev()
 */
export const isEnvModeDev = () => envMode() === ENV_MODE.DEV;

/**
 * Проверить, что режим окружения равен ENV_MODE.IFT
 *
 * @example
 * isEnvModeIft()
 */
export const isEnvModeIft = () => envMode() === ENV_MODE.IFT;

/**
 * Получить длительность таймаута на загрузку больших файлов
 *
 * @example
 * largeFileUploadTimeout()
 */
export const largeFileUploadTimeout = () =>
  Cypress.env('largeFileUploadTimeout');
