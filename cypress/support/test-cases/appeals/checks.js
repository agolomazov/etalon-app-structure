import {
  isAlias,
  isEnvModeDev,
  removeExtraSpaces,
} from '@support/common/utils';

import { selectors as appealsSelectors } from '@support/modules/appeals';

const getValue = (value) =>
  isAlias(value) ? cy.get(value) : cy.wrap(value, { log: false });

const compareField = ({ label, value, $label, $field }) => {
  getValue(value).then((val) => {
    expect($label.text()).to.be.eq(label);
    cy.wrap($field, { log: false })
      .contains(removeExtraSpaces(val))
      .should('exist');
  });
};

const checkFileLink = ($field, fileName) => {
  cy.wrap($field, { log: false })
    .find('a')
    .should('have.attr', 'href')
    .then((href) => {
      cy.request({
        url: href,
        method: 'GET',
      }).then(({ status, headers }) => {
        expect(status).to.eq(200);
        expect(headers['content-type']).to.be.eq('application/octet-stream');
        expect(headers).to.have.property('content-disposition');
        if (!isEnvModeDev()) {
          expect(headers['content-disposition']).to.be.eq(
            `attachment; filename="${fileName}"`,
          );
        }
      });
    });
};

/**
 * Сравнить текстовое поле
 *
 * @param {object} params  - параметры
 * @param {string} params.label - название
 * @param {string} params.value - значение
 */
export const compareTextField = ({ label, value }) => ({ $label, $field }) =>
  compareField({ label, value, $label, $field });

/**
 * Сравнить поле с периодом дат
 *
 * @param {object} params - параметры
 * @param {string} params.label - название
 * @param {Array<string>} params.value - значение [начальная дата, конечная дата]
 */
export const compareDatePeriodField = ({ label, value }) => ({
  $label,
  $field,
}) => {
  getValue(value).then(([from, to]) => {
    compareField({ label, value: `с ${from} по ${to}`, $label, $field });
  });
};

/**
 * Сравнить поле с файлом
 *
 * @param {object} params  - параметры
 * @param {string} params.name - название
 * @param {string} params.value - значение
 */
export const compareFileField = ({ label, value }) => ({ $label, $field }) => {
  compareField({ label, value, $label, $field });
  checkFileLink($field, value);
};

/**
 * Сравнить поле с файлами
 *
 * @param {object} params  - параметры
 * @param {string} params.name - название
 * @param {string[]} params.files - список файлов
 */
export const compareFileListField = ({ label, files = [] }) => ({
  $label,
  $field,
}) => {
  expect($label.text()).to.be.eq(label);

  cy.wrap($field, { log: false })
    .children()
    .should('have.length', files.length)
    .each(($el, index) => {
      expect($el.text()).to.contains(files[index]);
      checkFileLink($el, files[index]);
    });
};

/**
 * Сравнить все поля
 *
 * @param {Array} comparisons - массив со сравнениями
 */
export const compareAppealFieldsCheck = (comparisons = []) => () => {
  appealsSelectors
    .appealDetailsRequestInfo()
    .get('dt')
    .as('appealDetailsFields')
    .should('have.length', comparisons.length);

  cy.get('@appealDetailsFields').each(($label, index) => {
    const $field = $label.next('dd');
    const comparison = comparisons[index];
    Array.isArray(comparison)
      ? comparison.forEach((comp) => comp({ $label, $field }))
      : comparison({ $label, $field });
  });
};
