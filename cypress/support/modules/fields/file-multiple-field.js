import { FileBaseField } from './file-base-field';

export class FileMultipleField extends FileBaseField {
  /**
   * @param {import('./base-field').FieldParams} params
   */
  constructor(params) {
    super(params);
  }

  _getFileItems() {
    return this._getMe().parents('dd').find('[data-cy=file-item]');
  }

  _doShouldHaveValue(files = []) {
    this._getFileItems().should('have.length', files.length);

    this._getFileItems().each(($el, index) => {
      expect($el.text()).to.contain(files[index]);
    });
  }

  /**
   * Должен иметь список файлов
   *
   * Алиас для shouldHaveValue
   *
   * @param files - значения
   */
  shouldHaveFiles(files = []) {
    return this.shouldHaveValue(files);
  }
}
