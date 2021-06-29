const notificationsItem = () =>
  cy.get('.notifications-wrapper').find('.notifications-item');

export const selectors = {
  notificationsItem,
};
