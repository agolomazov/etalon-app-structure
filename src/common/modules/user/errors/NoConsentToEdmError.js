/**
 * Класс описывает ошибку, когда пользователь не дал согласие на ЭДО
 * @constructor
 */
export class NoConsentToEdmError extends Error {
  constructor() {
    super('');
    this.name = 'NoConsentToEdmError';
  }
}
