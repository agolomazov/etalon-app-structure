/**
 * Класс описывающий ошибки сервера
 */
export class ServerError extends Error {
  constructor(message = '', code = 0) {
    super(message);
    this.name = 'ServerError';
    this.code = code;
  }
}
