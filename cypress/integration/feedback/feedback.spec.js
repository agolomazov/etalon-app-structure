import {
  PERMISSIONS_MOCK,
  ERROR_MESSAGES,
  FIXTURE_FILES,
} from '@support/common/constants';
import { selectors } from '@support/common/selectors';
import { selectors as noticesSelectors } from '@support/modules/notices';

import { fields, email, file } from './fields';

describe('Оставить отзыв', () => {
  before(() => {
    cy.loginByJuridical(PERMISSIONS_MOCK);
  });

  beforeEach(() => {
    cy.visit('/');
    cy.contains('Оставить отзыв').click();
  });

  it('Проверка заголовка раздела, наименований элементов формы', () => {
    cy.contains('h1', 'Оставить отзыв о Личном кабинете').should('exist');
    cy.contains(
      'В данном разделе Вы можете оставить свои предложения и замечания, связанные с работой Личного кабинета.',
    ).should('exist');
    cy.get('[data-cy=feedbackInfoBlock]')
      .contains(
        'Форма предназначена исключительно для направления мнения о работе Личного кабинета. Если Вам необходимо задать вопрос или направить обращение по аренде федерального имущества, пожаловаться на действие/бездействие сотрудников Росимущества, воспользуйтесь разделом Жизненные ситуации.',
      )
      .should('exist');
    fields.forEach(({ field }) => field.shouldExist());
  });

  it('Проверка обязательности полей и валидации', () => {
    selectors.submitButton().click();
    fields.forEach(({ field, requiredMessage }) => {
      field.shouldRequired();
      field.isRequired
        ? field.shouldBeInvalid(requiredMessage)
        : field.shouldBeValid();
    });
    email.field
      .setValue('wrongemail')
      .shouldBeInvalid(ERROR_MESSAGES.WRONG_EMAIL);
  });

  it('Проверка загрузки файла больше 10 мб.', () => {
    file.field
      .appendFile(FIXTURE_FILES.EXTRA_LARGE_PNG)
      .shouldBeFailureBySize();
  });

  it('Отправка обращения', () => {
    cy.intercept('/feedback').as('feedback');

    fields.forEach((field) => field.action()());

    selectors.submitButton().click();

    cy.wait('@feedback').then(({ response }) => {
      expect(response.statusCode).to.eq(200);

      cy.url().should('eq', `${Cypress.config().baseUrl}#/`);

      noticesSelectors
        .notificationsItem()
        .contains(
          'Отзыв о работе Личного кабинета Арендатора успешно отправлен. Благодарим за оставленный отзыв - Вы помогаете нам становиться лучше.',
        )
        .should('exist');
    });

    cy.get('.loader-container').should('not.exist');
  });
});
