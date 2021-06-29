/**
 * Класс описывающий ошибки работы приложения
 */
export class ArlkError extends Error {
  constructor({ errorCode, errorMessage, errorTitle }) {
    super(errorMessage);
    this.name = 'ArlkError';
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.errorTitle = errorTitle;
  }
}
