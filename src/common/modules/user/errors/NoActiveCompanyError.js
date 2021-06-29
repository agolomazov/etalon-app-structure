/**
 * Класс описывает ошибку, когда пользователь не выбрал активную компанию
 * @constructor
 */
export class NoActiveCompanyError extends Error {
  constructor() {
    super('');
    this.name = 'NoActiveCompanyError';
  }
}
