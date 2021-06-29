import { InputField } from './input-field';

export class FileBaseField extends InputField {
  /**
   * @param {import('./base-field').FieldParams} params
   */
  constructor(params) {
    super(params);
  }

  _doSetValue(value) {
    this._getMe().attachFile(value, { subjectType: 'drag-n-drop' });
  }

  _doShouldRequired() {
    this.isRequired
      ? this._getMe()
          .parents('.filedrop-wrapper')
          .should('have.class', 'required')
      : this._getMe()
          .parents('.filedrop-wrapper')
          .should('not.have.class', 'required');
  }

  /**
   * Алиас для setValue
   *
   * @param  file файл
   */
  appendFile(file) {
    return this.setValue(file);
  }

  /**
   * Дождаться окончания загрузки
   *
   * @param params
   * @param params.timeout
   */
  waitStopLoading({ timeout } = {}) {
    this._getMe()
      .parent()
      .find('.loader-container', { timeout })
      .should('not.exist');
    return this;
  }

  /**
   * Должна быть ошибка связанная с превышением размера файла
   */
  shouldBeFailureBySize() {
    this._getMe()
      .parent()
      .contains('Размер файла превышает 10 мб')
      .should('exist');
    return this;
  }
}
