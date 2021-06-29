import { InputField } from './input-field';

export class MultiSelectField extends InputField {
  /**
   * @param {import('./base-field').FieldParams} params
   */
  constructor(params) {
    super(params);
  }

  _getSuggestionItems() {
    return cy.get('.suggestion-list').find('.suggestion-item');
  }

  _doSetValue(value) {
    this._getMe().parent().parent().click();
    this._getSuggestionItems().contains(value).click();
    cy.get('.button-wrapper').contains('Выбрать').click();
  }

  _doShouldHaveValue(items = []) {
    this._getMe().click();

    this._getSuggestionItems().should('have.length', items.length);

    this._getSuggestionItems().each(($el, index) => {
      expect($el.text()).to.eq(items[index]);
    });

    this._getMe().blur();
  }

  /**
   * Должен иметь список значений
   * Алиас для shouldHaveValue
   *
   * @param items - значения
   */
  shouldHaveItems(items = []) {
    return this.shouldHaveValue(items);
  }
}
