import { TENANT_TYPES, APP_ROUTES } from '@src/constants';

/**
 * Фунция создает массив данных для компонентов AutoComplete, DropDownSelect
 *
 * @example
 * const APPEAL_TYPES = {
 *   RANSFER: 'transfer',
 *   REFUND: 'refund',
 * };
 *
 * const APPEAL_TYPE_MAP = {
 *   [APPEAL_TYPES.RANSFER]: {
 *     displayText: 'Зачет денежных средств на другой договор',
 *   },
 *   [APPEAL_TYPES.REFUND]: {
 *     displayText: 'Возврат денежных средств',
 *   },
 * };
 *
 * const APPEAL_DROPDOWN_ITEMS = createTypesItems(
 *   APPEAL_TYPES,
 *   APPEAL_TYPE_MAP,
 * );
 *
 * @param {object} types - объект с описание типа
 * @param {object} typeMap - объект с маппингом
 * @param {string} displayTextField - поля, из которого брать текст для отображения в списке
 */

export const createTypesItems = (
  types,
  typeMap,
  displayTextField = 'displayText',
) =>
  Object.values(types).map((value) => ({
    type: value,
    displayText: typeMap[value][displayTextField],
  }));

/**
 * Метод осуществляет поиск по списоку ЖС по названию и ключевым словам
 * @example situationsListFilter(value)
 *
 * @param {Array} situationsList - список ЖС
 * @param {string} value - искомое значение
 *
 * @returns {Array} отфильтрованный массив ЖС
 */
export const situationsListFilter = (situationsList, value) =>
  situationsList.filter(({ title, tags }) =>
    value
      .toLowerCase()
      .split(' ')
      // eslint-disable-next-line no-bitwise
      .every((el) => ~(title.toLowerCase() + tags.toLowerCase()).indexOf(el)),
  );

/**
 * Метод фильтрует список ЖС в зависимости от типа организации пользователя
 * @example getSituationsList(situations, tenantType)
 *
 * @param {Array} situations - список ЖС
 * @param {string} tenantType - тип арендатора
 *
 * @returns {Array} отфильтрованный массив ЖС
 */
export const getSituationsList = (situations, tenantType) => {
  const situationList = situations.filter(({ hidden }) => !hidden);
  if (tenantType !== TENANT_TYPES.JURIDICAL_PERSON) {
    return situationList.filter(
      (el) => el.to !== APP_ROUTES.SITUATION_CHANGE_DETAILS,
    );
  }
  return situationList;
};
