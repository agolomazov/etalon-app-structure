/**
 * Переход на страницу со списком ЖС
 *
 */
export const visitLifeSituations = () => {
  cy.visit('/');
  cy.contains('Жизненные ситуации').click();
};

/**
 * Переход на страницу ЖС
 *
 * @param {string} lifeSituationTileText наименование ЖС на странице со списком ЖС
 */
export const visitLifeSituation = (lifeSituationTileText) => {
  visitLifeSituations();
  cy.contains(lifeSituationTileText).parent().click();
  cy.get('.loader-container').should('not.exist');
};

/**
 * Проверка заголовка ЖС и наличия кнопки назад
 *
 * @param {string} lifeSituationCaption заголовок ЖС
 */
export const checkExistsHeaderWithBackButton = (lifeSituationCaption) => {
  cy.contains('h1', lifeSituationCaption).should('exist');
  cy.get('a.novicon-arrow-backward');
};

/**
 * Сформировать текст уведомления по заголовку обращения
 *
 * @param {string} appealTitle заголовок обращения
 */
export const getNotifyMessage = (appealTitle) =>
  `Обращение ${appealTitle} успешно отправлено`;
