import { InputField } from './input-field';

export class DropdownSelectField extends InputField {
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
    this._getMe().click();
    this._getSuggestionItems().contains(value).click();
  }

  /**
   * Установить значение по номеру
   *
   * @param index - номер
   */
  setValueByIndex(index) {
    this._getMe().click();
    this._getSuggestionItems().eq(index).click();
    return this;
  }

  /**
   * Должен иметь список значений
   *
   * @param items - значения
   */
  shouldHaveItems(items = []) {
    this._getOrWrap(items).then(() => {
      this._getMe().click();
      this._getSuggestionItems().should('have.length', items.length);
      this._getSuggestionItems().each(($el, index) => {
        expect($el.text()).to.eq(items[index]);
      });
      this._getMe().blur();
    });
    return this;
  }
}
