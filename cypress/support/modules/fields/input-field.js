import { BaseField } from './base-field';

export class InputField extends BaseField {
  /**
   * @param {import('./base-field').FieldParams} params
   */
  constructor(params) {
    super(params);
  }

  _getMe() {
    return cy.getByName(this.name).eq(this.index);
  }

  _doSetValue(value) {
    this._getMe().clear().type(value).blur();
  }

  _doGetValue() {
    return this._getMe().invoke('val');
  }

  _doShouldExist() {
    const { label, description, tooltip } = this;
    this._getMe().shouldExistLabeledField({
      label,
      description,
      tooltip,
    });
  }

  _doShouldHaveValue(value) {
    this._getMe().should('have.value', value);
  }

  _doShouldRequired() {
    this._getMe()
      .invoke('attr', 'aria-required')
      .then((attr) => {
        if (this.isRequired) expect(attr).to.eq('true');
        else attr && expect(attr).to.eq('false');
      });
  }

  _doShouldBeInvalid(invalidMessage) {
    this._getMe().shouldInvalidValidation(invalidMessage);
  }

  _doShouldBeValid() {
    this._getMe().shouldCorrectValidation();
  }

  _doShouldBeDisabled(isDisabled) {
    this._getMe().should(isDisabled ? 'be.disabled' : 'not.be.disabled');
  }
}
