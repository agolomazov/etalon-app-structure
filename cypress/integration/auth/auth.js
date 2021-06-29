/// <reference types="cypress" />

/**
 * Метод генерирует тесты по заданным параметрам
 *
 * @param {Object} cases - тест-кейсы
 * @param {Array} cases.withPermissions - Требуемые для теста привилегии
 * @param {Array} cases.withoutPermissions - Привилегии которых быть не должно
 * @param {string} cases.loginType - Тип организации для логина
 * @param {string} cases.tenantType - Тип организации в приложении
 * @param {string} cases.text - название тест-кейса
 *
 * @returns {void} сгенерированные тесты
 */
export const auth = (cases) => {
  beforeEach(() => {
    cy.intercept('/user').as('fetchUser');
  });

  cases.forEach(
    ({ withPermissions, withoutPermissions, loginType, tenantType, text }) => {
      it(`авторизация через ЕСИА ${text}`, () => {
        cy.login({ withPermissions, withoutPermissions, type: loginType });

        cy.visit('/');

        cy.wait('@fetchUser').then(({ response }) => {
          expect(response.statusCode).to.eq(200);

          expect(response.body.tenantInfo.type).to.eq(tenantType);

          expect(response.body.permissions).to.include.members(
            withPermissions || [],
          );

          withoutPermissions &&
            withoutPermissions.forEach((permission) =>
              expect(response.body.permissions).to.not.include(permission),
            );
        });
      });
    },
  );
};
