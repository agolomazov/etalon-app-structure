import { FileBaseField } from './file-base-field';

export class FileField extends FileBaseField {
  /**
   * @param {import('./base-field').FieldParams} params
   */
  constructor(params) {
    super(params);
  }

  /**
   * Файл должен быть удачно добавлен
   *
   * @param params
   * @param params.timeout
   */
  shouldBeSuccess({ timeout } = {}) {
    this._getMe()
      .parent()
      .find('i.novicon-success-fill', { timeout })
      .should('exist');
    return this;
  }
}
