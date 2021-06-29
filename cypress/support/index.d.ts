/// <reference types="cypress" />

declare namespace Cypress {
  interface LoginByTypeOptions {
    withPermissions?: Array<string>;
    withoutPermissions?: Array<string>;
  }

  interface LoginOptions extends LoginByTypeOptions {
    type: string;
  }

  interface LabeledFieldExistOptions {
    label: string;
    description?: string;
    tooltip?: string;
  }

  interface Chainable<Subject> {
    /**
     * Авторизироваться
     * @example
     * cy.login({type:'natural'})
     */
    login(options: LoginOptions): Chainable<any>;

    /**
     * Авторизироваться под УЗ ФЛ
     * @example
     * cy.loginByNatural()
     */
    loginByNatural(options: LoginByTypeOptions): Chainable<any>;

    /**
     * Авторизироваться под УЗ ЮЛ
     * @example
     * cy.loginByJuridical()
     */
    loginByJuridical(options: LoginByTypeOptions): Chainable<any>;

    /**
     * Авторизироваться под УЗ ИП
     * @example
     * cy.loginByEntrepreneur()
     */
    loginByEntrepreneur(options: LoginByTypeOptions): Chainable<any>;

    /**
     * Получить один или несколько DOM элементов по атрибуту name
     * @example
     * cy.getByName('formFieldName')
     */
    getByName(name: string): Chainable<Element>;

    /**
     * Получить значения всех алиасов
     * @example
     * cy.getAliases([alias1, alias2]).then( ([value1, value2])=>{})
     */
    getAliases(aliases: string[]): Chainable<Element>;

    /**
     * Проверяет наличие поля
     * @example
     * cy.shouldExistLabeledField({ label: 'Имя'})
     */
    shouldExistLabeledField(
      options: LabeledFieldExistOptions,
    ): Chainable<Element>;

    /**
     * Получить Dom элемент информационного поля
     * @example
     * cy.getInfoField('Договор')
     * cy.get('.list').getInfoField('Договор')
     */
    getInfoField(label: string): Chainable<Element>;

    /**
     * Проверяет инпут на невалидность
     * @example
     * cy.get('input').shouldInvalidValidation()
     */
    shouldInvalidValidation(message: string): Chainable<any>;

    /**
     * Проверяет инпут на валидность
     * @example
     * cy.get('input').shouldCorrectValidation()
     */
    shouldCorrectValidation(): Chainable<any>;

    /**
     * Удаляет файл в папке загрузок по имени
     * @example
     * cy.deleteDownloadedFile(name)
     */
    deleteDownloadedFile(name: string): Chainable<any>;

    /**
     * Ищет файл в папке загрузок по имени
     * @example
     * cy.findDownloadedFile(name)
     */
    findDownloadedFile(name: string): Chainable<any>;
  }
}
