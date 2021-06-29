import { isAlias } from '@support/common/utils';

/**
 * @typedef {Object} FieldParams
 * @property {string} name - имя
 * @property {string} label - метка
 * @property {string} description - описание
 * @property {string} tooltip - текст всплывающей подсказки
 * @property {boolean} isRequired - обязательный или нет
 * @property {number} index - номер
 */

export class BaseField {
  /**
   * @param {FieldParams} params
   */
  constructor({
    name,
    label,
    description,
    tooltip,
    isRequired = false,
    index = 0,
  }) {
    this.name = name;
    this.label = label;
    this.description = description;
    this.tooltip = tooltip;
    this.isRequired = isRequired;
    this.index = index;
  }

  _getOrWrap(value) {
    return isAlias(value) ? cy.get(value) : cy.wrap(value, { log: false });
  }

  _doSetValue(value) {
    throw new Error(`Not Implemented ${this.constructor.name}`);
  }
  _doGetValue() {
    throw new Error(`Not Implemented ${this.constructor.name}`);
  }
  _doShouldExist() {
    throw new Error(`Not Implemented ${this.constructor.name}`);
  }
  _doShouldHaveValue(value) {
    throw new Error(`Not Implemented ${this.constructor.name}`);
  }
  _doShouldRequired() {
    throw new Error(`Not Implemented ${this.constructor.name}`);
  }
  _doShouldBeInvalid(invalidMesage) {
    throw new Error(`Not Implemented ${this.constructor.name}`);
  }
  _doShouldBeValid() {
    throw new Error(`Not Implemented ${this.constructor.name}`);
  }
  _doShouldBeDisabled(isDisabled) {
    throw new Error(`Not Implemented ${this.constructor.name}`);
  }

  /**
   * Установить значение
   *
   * @param value - значение
   */
  setValue(value) {
    this._getOrWrap(value).then((val) => this._doSetValue(val));
    return this;
  }

  /**
   * Получить значение
   * @returns {Cypress.Chainable}
   */
  getValue() {
    return this._doGetValue();
  }

  /**
   * Должен быть в DOM дереве
   */
  shouldExist() {
    this._doShouldExist();
    return this;
  }

  /**
   * Должен иметь значение
   *
   * @param value - значение
   */
  shouldHaveValue(value) {
    this._getOrWrap(value).then((val) => this._doShouldHaveValue(val));
    return this;
  }

  /**
   * Должен быть обязательным или нет ( зависит от this.isRequired )
   */
  shouldRequired() {
    this._doShouldRequired();
    return this;
  }

  /**
   * Должен быть невалидным
   */
  shouldBeInvalid(invalidMesage) {
    this._doShouldBeInvalid(invalidMesage);
    return this;
  }

  /**
   * Должен быть валидным
   */
  shouldBeValid() {
    this._doShouldBeValid();
    return this;
  }

  /**
   * Должен быть активным/неактивным
   */
  shouldBeDisabled(isDisabled) {
    this._getOrWrap(isDisabled).then((val) => this._doShouldBeDisabled(val));
    return this;
  }
}
