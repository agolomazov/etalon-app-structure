import { selectors } from '@support/common/selectors';
import { ERROR_MESSAGES, PERMISSIONS_MOCK } from '@support/common/constants';

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

import { fields, subtenantInn, file } from './fields';

const LIFE_SITUATION_CAPTION = 'Уведомление о субаренде';
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

    cy.contains('1. Выберите договор').should('exist');
    cy.contains('2. Информация о договоре субаренды').should('exist');

    fields.forEach(({ field }) => field.shouldExist());
  });

  it('Проверяем поля на обязательность заполнения', () => {
    selectors.submitButton().click();
    fields.forEach(({ field, requiredMessage }) => {
      field.shouldRequired();
      field.isRequired
        ? field.shouldBeInvalid(requiredMessage)
        : field.shouldBeValid();
    });
  });

  it('Проверяем поля на валидацию', () => {
    subtenantInn.field
      .setValue('12345')
      .shouldBeInvalid(ERROR_MESSAGES.WRONG_SUBTENANT_INN);
  });

  it('Проверка загрузки файлов разных размеров', () => {
    singleFileUploadTestCase(file.field);
  });

  it('Создание обращения', () => {
    createAppealTestCase({
      appealType: APPEAL_DETAILS.SUBLEASE_NOTICE.type,
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
