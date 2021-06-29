import { PERMISSIONS_MOCK } from '@support/common/constants';
import { selectors } from '@support/common/selectors';

import {
  APPEAL_DETAILS,
  visitLifeSituation,
  checkExistsHeaderWithBackButton,
} from '@support/modules/appeals';

import {
  createAppealTestCase,
  compareAppealFieldsCheck,
  singleFileUploadTestCase,
} from '@support/test-cases/appeals';

import { file, fields } from './fields';

const LIFE_SITUATION_CAPTION = 'Отсутствует платеж по договору аренды';
const LIFE_SITUATION_TILE_TEXT = LIFE_SITUATION_CAPTION;

describe(LIFE_SITUATION_CAPTION, () => {
  before(() => {
    cy.loginByJuridical(PERMISSIONS_MOCK);
  });

  beforeEach(() => {
    cy.intercept('/contract').as('fetchContracts');
    visitLifeSituation(LIFE_SITUATION_TILE_TEXT);
  });

  it('Проверка заголовка ЖС, наименований элементов формы', () => {
    checkExistsHeaderWithBackButton(LIFE_SITUATION_CAPTION);

    cy.contains('1. Выберите договор, по которому проводилась оплата').should(
      'exist',
    );

    cy.contains('2. Укажите сведения о платежном поручении').should('exist');

    fields.forEach(({ field }) => field.shouldExist());
  });

  it('Проверка обязательности полей', () => {
    selectors.submitButton().click();
    fields.forEach(({ field, requiredMessage }) => {
      field.shouldRequired();
      field.isRequired
        ? field.shouldBeInvalid(requiredMessage)
        : field.shouldBeValid();
    });
  });

  it('Проверка загрузки файлов разных размеров', () => {
    singleFileUploadTestCase(file.field);
  });

  it('Создание обращения', () => {
    createAppealTestCase({
      appealType: APPEAL_DETAILS.MISSING_PAYMENT.type,
      appealTitle: '@appealTitle',
      actions: Object.values(fields).map((field) => field.action()),
      checks: [
        compareAppealFieldsCheck(
          Object.values(fields).map((field) => field.check()),
        ),
      ],
    });
  });
});
