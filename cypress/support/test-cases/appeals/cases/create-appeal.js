import { isAlias } from '@support/common/utils';
import { selectors } from '@support/common/selectors';

import { selectors as noticesSelectors } from '@support/modules/notices';

import {
  APPEAL_STATES,
  getNotifyMessage,
  selectors as appealsSelectors,
} from '@support/modules/appeals';

/**
 * Тест-кейс для проверки создания обращения
 *
 * @param {object} params - параметры
 * @param {string} params.appealType - тип обращения
 * @param {string} params.appealTitle - заголовок обращения
 * @param {Array} params.actions - действия, которые вызываются перед отправкой обращения
 * @param {Array} params.checks - проверки, которые необходимо сделать после отправки обращения
 *
 */
export const createAppealTestCase = ({
  appealType,
  appealTitle,
  actions = [],
  checks = [],
}) => {
  // вызываем все действия
  actions.forEach((action) =>
    Array.isArray(action) ? action.forEach((act) => act()) : action(),
  );

  // Нажимаем на кнопку отправить
  cy.intercept(
    `/${appealType.split('_').join('-').toLowerCase()}-collection`,
  ).as('sendAppeal');

  selectors.submitButton().click();

  cy.wait('@sendAppeal').then(({ response }) => {
    const { appeals } = response.body;

    expect(appeals).to.be.an('array').that.have.length(1);
    expect(appeals[0].id).to.be.a('string').and.not.empty;

    cy.wrap(appeals[0].id, { log: false }).as('appealId');
  });

  // Проверяем, что адресная строка содержит id обращения
  cy.get('@appealId').then((appealId) => cy.url().should('contain', appealId));

  // Провереям всплывающее уведомление и заголовок в деталях обращения
  const getAppealTitle = (appealTitle) =>
    isAlias(appealTitle)
      ? cy.get(appealTitle)
      : cy.wrap(appealTitle, { log: false });

  getAppealTitle(appealTitle).then((appealTitle) => {
    const notifyMessage = getNotifyMessage(appealTitle);

    noticesSelectors
      .notificationsItem()
      .contains(notifyMessage)
      .should('exist');

    appealsSelectors.appealDetailsTitle().contains(appealTitle).should('exist');
  });

  cy.get('.loader-container').should('not.exist');

  // Проверяем статус обращения
  appealsSelectors
    .appealDetailsState()
    .invoke('text')
    .should('be.oneOf', [
      APPEAL_STATES.SENT.name,
      APPEAL_STATES.DELIVERED.name,
    ]);

  // выполняем проверки
  checks.forEach((check) => check());
};
