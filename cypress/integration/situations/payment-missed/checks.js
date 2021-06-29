/**
 * Проверка на наличие ссылки на договор
 */
export const contractLinkCheck = ({ $field }) => {
  cy.get('@contractId').then((contractId) => {
    contractId
      ? cy.wrap($field).find('a').should('exist').and('attr', 'href')
      : cy.wrap($field).find('a').should('not.exist');
  });
};
