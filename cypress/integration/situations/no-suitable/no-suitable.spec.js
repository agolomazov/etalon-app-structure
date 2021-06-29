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
  multipleFilesUploadTestCase,
} from '@support/test-cases/appeals';

import { fields, files } from './fields';

const LIFE_SITUATION_CAPTION = 'Нет подходящей жизненной ситуации';
const LIFE_SITUATION_TILE_TEXT = LIFE_SITUATION_CAPTION;

describe(LIFE_SITUATION_CAPTION, () => {
  before(() => {
    cy.loginByJuridical(PERMISSIONS_MOCK);
  });

  beforeEach(() => {
    visitLifeSituation(LIFE_SITUATION_TILE_TEXT);
  });

  it('Проверка заголовка ЖС, наименований элементов формы', () => {
    checkExistsHeaderWithBackButton(LIFE_SITUATION_CAPTION);

    cy.contains(
      '1. Выберите территориальный орган Росимущества для подачи обращения',
    ).should('exist');
    cy.contains('2. Содержание обращения').should('exist');

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

  it('Проверка загрузки файлов разных размеров', () => {
    multipleFilesUploadTestCase(files.field);
  });

  it('Создание обращения', () => {
    createAppealTestCase({
      appealType: APPEAL_DETAILS.NO_SUITABLE_LIFE_SITUATION.type,
      appealTitle: APPEAL_DETAILS.NO_SUITABLE_LIFE_SITUATION.title(),
      actions: Object.values(fields).map((field) => field.action()),
      checks: [
        compareAppealFieldsCheck(
          Object.values(fields).map((field) => field.check()),
        ),
      ],
    });
  });
});
