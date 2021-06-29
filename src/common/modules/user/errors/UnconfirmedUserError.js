/**
 * Класс описывает ошибку, когда у пользователя неподтвержденная УЗ ЕСИА
 * @constructor
 */
export class UnconfirmedUserError extends Error {
  constructor() {
    super('');
    this.name = 'UnconfirmedUserError';
  }
}
