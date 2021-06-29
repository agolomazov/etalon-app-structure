const appealDetailsContainer = () => cy.get('.message-body-scroll-area');

/**
 * Селектор. Заголовок обращения
 */
const appealDetailsTitle = () =>
  appealDetailsContainer().find('h5.line-height-1');

/**
 * Селектор. Статус обращения
 */
const appealDetailsState = () => appealDetailsContainer().find('.tag');

/**
 * Селектор. Блок с информацией по запросу
 */
const appealDetailsRequestInfo = () =>
  appealDetailsContainer().contains('Информация по запросу').next();

/**
 * Селектор. Список обращений
 */
const appealsList = () =>
  cy.get('.message-list').find('.message-list-scroll-area');

/**
 * Селектор. Элемент списка обращений
 */
const appealsListItem = () => appealsList().find(`.message-item`);

/**
 * Селектор. Выбранный элемент списка обращений
 */
const appealsListSelectedItem = () => appealsListItem().find('.active');

export const selectors = {
  appealDetailsTitle,
  appealDetailsState,
  appealDetailsRequestInfo,
  appealsList,
  appealsListItem,
  appealsListSelectedItem,
};
