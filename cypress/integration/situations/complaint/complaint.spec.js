import { isEnvModeDev } from '@support/common/utils';
import { PERMISSIONS_MOCK } from '@support/common/constants';
import { selectors } from '@support/common/selectors';

import {
  APPEAL_DETAILS,
  visitLifeSituation,
  checkExistsHeaderWithBackButton,
} from '@support/modules/appeals';

import { ROSSIM_OFFICE_MOCK } from '@support/modules/appeals/constants';

import {
  createAppealTestCase,
  compareAppealFieldsCheck,
  multipleFilesUploadTestCase,
} from '@support/test-cases/appeals';

import {
  appealType,
  documentDate,
  documentNumber,
  files,
  complainActionFields,
  complainDocumentFields,
} from './fields';

const LIFE_SITUATION_TILE_TEXT =
  'Жалобы на акты, действия / бездействия должностных лиц';
const LIFE_SITUATION_CAPTION =
  'Жалобы на акты, действия или бездействия должностных лиц';
const COMPLAINT_DOCUMENT = 'На акт (документ)';
const COMPLAINT_ACTION = 'На действие или бездействие должностных лиц';

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
      '1. Выберите из списка территориальный орган Росимущества, действия которого обжалуются',
    ).should('exist');
    cy.contains('2. Предмет обжалования').should('exist');

    appealType
      .shouldExist()
      .shouldHaveItems([COMPLAINT_DOCUMENT, COMPLAINT_ACTION])
      .setValue(COMPLAINT_DOCUMENT);

    cy.contains('3. Содержание обращения').should('exist');
    complainDocumentFields.forEach(({ field }) => field.shouldExist());

    appealType.setValue(COMPLAINT_ACTION);
    cy.contains('3. Содержание обращения').should('exist');
    complainActionFields.forEach(({ field }) => field.shouldExist());
  });

  describe('Жалоба на документ', () => {
    beforeEach(() => {
      appealType.setValue(COMPLAINT_DOCUMENT);
      cy.get('.loader-container').should('not.exist');
    });

    it('Проверка обязательности полей', () => {
      selectors.submitButton().click();
      complainDocumentFields.forEach(({ field, requiredMessage }) => {
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
        appealType: APPEAL_DETAILS.COMPLAINT_ON_DOCUMENT.type,
        appealTitle: APPEAL_DETAILS.COMPLAINT_ON_DOCUMENT.title(
          documentNumber.type,
          documentDate.type,
        ),
        actions: Object.values(complainDocumentFields).map((field) =>
          field.action(),
        ),
        checks: [
          compareAppealFieldsCheck(
            Object.values(complainDocumentFields).map((field) => field.check()),
          ),
        ],
      });
    });
  });

  describe('Жалоба на действие / бездействие', () => {
    beforeEach(() => {
      appealType.setValue(COMPLAINT_ACTION);
      cy.get('.loader-container').should('not.exist');
    });

    it('Проверка обязательности полей', () => {
      selectors.submitButton().click();
      complainActionFields.forEach(({ field, requiredMessage }) => {
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
        appealType: APPEAL_DETAILS.COMPLAINT_ON_ACTION.type,
        appealTitle: '@appealTitle',
        actions: [
          Object.values(complainActionFields).map((field) => field.action()),
          () =>
            cy
              .get('@landlord')
              .then((value) =>
                cy
                  .wrap(APPEAL_DETAILS.COMPLAINT_ON_ACTION.title(value))
                  .as('appealTitle'),
              ),
        ],
        checks: [
          compareAppealFieldsCheck(
            Object.values(complainActionFields).map((field) => field.check()),
          ),
        ],
      });
    });
  });
});
