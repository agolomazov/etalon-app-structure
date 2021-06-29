import { BaseField } from './base-field';

export class DownloadField extends BaseField {
  /**
   * @typedef {import('./base-field').FieldParams &
   * {fieldDescription: string, fileName: string}} DownloadFieldParams
   */
  /**
   * @param {DownloadFieldParams} params
   */
  constructor(params) {
    const { fieldDescription, fileName, ...rest } = params;
    super(rest);
    this.fieldDescription = fieldDescription;
    this.fileName = fileName;
  }

  _getMe() {
    return cy.getByName(this.name).eq(this.index);
  }

  _doShouldExist() {
    const { label, description, tooltip } = this;
    this._getMe().shouldExistLabeledField({
      label,
      description,
      tooltip,
    });
    this._getMe()
      .should('have.class', 'button-wrapper warning margin-bottom-12')
      .contains('Скачать')
      .should('exist');
    this._getMe().next().contains(this.fieldDescription).should('exist');
  }

  _doShouldBeValid() {}

  _doShouldRequired() {}

  /**
   * Удаляет скаченый ранее файл(если был) и скачивает новый
   */
  download() {
    cy.deleteDownloadedFile(this.fileName);
    this._getMe().click();
    return this;
  }

  /**
   * Проверяет был ли скачен файл с корректным именем
   */
  shouldDownload() {
    cy.wait(1500);
    cy.findDownloadedFile(this.fileName).should('exist');
    return this;
  }
}
