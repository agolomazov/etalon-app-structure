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

import {
  appealType,
  appealFile,
  powerOfAttorneyFile,
  fileFields,
  consentFields,
  rejectFields,
  downloadConsentApeal,
  downloadRejectApeal,
} from './fields';

const LIFE_SITUATION_TILE_TEXT =
  'Заявление на получение / на отказ от получения документов на бумажном носителе';
const LIFE_SITUATION_CAPTION = LIFE_SITUATION_TILE_TEXT;
const CONSENT_TO_PAPER_WORKFLOW = 'Получение документов на бумажном носителе';
const REJECT_PAPER_WORKFLOW =
  'Отказ от получения документов на бумажном носителе';

describe(LIFE_SITUATION_CAPTION, () => {
  before(() => {
    cy.loginByJuridical(PERMISSIONS_MOCK);
  });

  beforeEach(() => {
    visitLifeSituation(LIFE_SITUATION_TILE_TEXT);
  });

  it('Проверка заголовка ЖС, наименований элементов формы', () => {
    checkExistsHeaderWithBackButton(LIFE_SITUATION_CAPTION);

    cy.contains('1. Выберите тип заявления').should('exist');

    appealType
      .shouldExist()
      .shouldHaveItems([CONSENT_TO_PAPER_WORKFLOW, REJECT_PAPER_WORKFLOW])
      .setValue(CONSENT_TO_PAPER_WORKFLOW);

    cy.contains('2. Скачайте, подпишите и загрузите заявление').should('exist');
    consentFields.forEach(({ field }) => field.shouldExist());

    appealType.setValue(REJECT_PAPER_WORKFLOW);

    cy.contains('2. Скачайте, подпишите и загрузите заявление').should('exist');
    rejectFields.forEach(({ field }) => field.shouldExist());
  });

  describe('Проверяем скачивание заявлений', () => {
    it('Скачиваем Заявление на отказ от получения документов', () => {
      cy.intercept('application/file/form').as('aplicationFile');
      appealType.setValue(REJECT_PAPER_WORKFLOW);
      downloadRejectApeal.field.download();
      cy.wait('@aplicationFile');
      downloadRejectApeal.field.shouldDownload();
    });

    it('Скачиваем Заявление на получения документов', () => {
      cy.intercept('application/file/form').as('aplicationFile');
      appealType.setValue(CONSENT_TO_PAPER_WORKFLOW);
      downloadConsentApeal.field.download();
      cy.wait('@aplicationFile');
      downloadConsentApeal.field.shouldDownload();
    });
  });

  const paperWorkflowTests = (appealName, appealDetails) => {
    describe(appealName, () => {
      beforeEach(() => {
        appealType.setValue(appealName);
        cy.get('.loader-container').should('not.exist');
      });

      it('Проверка обязательности полей', () => {
        selectors.submitButton().click();
        fileFields.forEach(({ field, requiredMessage }) => {
          field.shouldRequired();
          field.isRequired
            ? field.shouldBeInvalid(requiredMessage)
            : field.shouldBeValid();
        });
      });

      it('Проверка загрузки файлов разных размеров', () => {
        singleFileUploadTestCase(appealFile.field);
        singleFileUploadTestCase(powerOfAttorneyFile.field);
      });

      it('Создание обращения', () => {
        createAppealTestCase({
          appealType: appealDetails.type,
          appealTitle: appealDetails.title(),
          actions: fileFields.map((field) => field.action()),
          checks: [
            compareAppealFieldsCheck(fileFields.map((field) => field.check())),
          ],
        });
      });
    });
  };

  paperWorkflowTests(
    CONSENT_TO_PAPER_WORKFLOW,
    APPEAL_DETAILS.CONSENT_TO_PAPER_WORKFLOW,
  );
  paperWorkflowTests(
    REJECT_PAPER_WORKFLOW,
    APPEAL_DETAILS.REFUSAL_FROM_PAPER_WORKFLOW,
  );
});
