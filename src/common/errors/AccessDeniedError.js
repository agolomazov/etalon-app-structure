/**
 * Класс описывает ошибку, когда у пользователя нет прав на работу в ЛК
 * @constructor
 */
export class AccessDeniedError extends Error {
  constructor(message = '', code = 0) {
    super('');
    this.name = 'AccessDeniedError';
    this.code = code;
    this.message = message;
  }
}
