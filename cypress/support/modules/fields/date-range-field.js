import { BaseField } from './base-field';

export class DateRangeField extends BaseField {
  /**
   * @param {import('./base-field').FieldParams} params
   */
  constructor(params) {
    super(params);
  }

  _getMeFrom() {
    return cy.getByName(`${this.name}-from`).eq(this.index);
  }

  _getMeTo() {
    return cy.getByName(`${this.name}-to`).eq(this.index);
  }

  _doSetValue([from, to]) {
    this._getMeFrom().clear().type(from);
    this._getMeTo().clear().type(to).blur();
  }

  _doShouldExist() {
    const { label, description, tooltip } = this;
    this._getMeFrom().shouldExistLabeledField({ label, description, tooltip });
    this._getMeTo().shouldExistLabeledField({ label, description, tooltip });
  }

  _doShouldHaveValue([from, to]) {
    this._getMeFrom().should('have.value', from);
    this._getMeTo().should('have.value', to);
  }

  _doShouldRequired() {
    this._getMeFrom().should(
      'have.attr',
      'aria-required',
      this.isRequired.toString(),
    );
    this._getMeTo().should(
      'have.attr',
      'aria-required',
      this.isRequired.toString(),
    );
  }

  _doShouldBeInvalid() {
    this._getMeFrom().shouldInvalidValidation();
    this._getMeTo().shouldInvalidValidation();
  }

  _doShouldBeValid() {
    this._getMeFrom().shouldCorrectValidation();
    this._getMeTo().shouldCorrectValidation();
  }

  _doShouldBeDisabled(isDisabled) {
    const should = isDisabled ? 'be.disabled' : 'not.be.disabled';
    this._getMeFrom().should(should);
    this._getMeTo().should(should);
  }
}
