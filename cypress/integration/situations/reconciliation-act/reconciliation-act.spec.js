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
  contractNumber,
  contractDate,
  actPeriod,
  file,
  requestActActions,
  requestActChecks,
  scannedActActions,
  scannedActChecks,
} from './fields';

const LIFE_SITUATION_CAPTION = 'Получить акт сверки взаимных расчетов';
const LIFE_SITUATION_TILE_TEXT = LIFE_SITUATION_CAPTION;
const MAX_APPEALS_COUNT = 30;
const SCANNED_ACT = 'Направить скан-копию подписанного акта сверки';
const REQUEST_ACT = 'Запросить акт сверки';

const appendContractButton = () =>
  cy.get('button').contains('+ Добавить договор');

const appealMaxCountTest = () => {
  it(`Количество обращений не должно превышать ${MAX_APPEALS_COUNT}`, () => {
    for (let i = 0; i < MAX_APPEALS_COUNT - 1; ++i) {
      appendContractButton().should('not.have.class', 'disabled');
      appendContractButton().click();
    }
    appendContractButton().should('have.class', 'disabled');
  });
};

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

    cy.contains('1. Направить или запросить акт сверки?').should('exist');

    appealType
      .shouldExist()
      .shouldHaveItems([SCANNED_ACT, REQUEST_ACT])
      .setValue(SCANNED_ACT);

    [contractNumber, contractDate, actPeriod, file].forEach(({ field }) =>
      field.shouldExist(),
    );

    appealType.setValue(REQUEST_ACT);
    [contractNumber, contractDate, actPeriod].forEach(({ field }) =>
      field.shouldExist(),
    );

    cy.contains('2. Выберите договор/договоры').should('exist');
  });

  describe('Направить скан-копию подписанного акта сверки', () => {
    beforeEach(() => {
      appealType.setValue(SCANNED_ACT);
    });

    it('Проверка обязательности полей', () => {
      cy.wait(1000);
      selectors.submitButton().click();

      [contractNumber, contractDate, actPeriod, file].forEach(
        ({ field, requiredMessage }) => {
          field.shouldRequired();
          field.isRequired
            ? field.shouldBeInvalid(requiredMessage)
            : field.shouldBeValid();
        },
      );
    });

    appealMaxCountTest();

    it('Проверка загрузки файлов разных размеров', () => {
      singleFileUploadTestCase(file.field);
    });

    it('Создание одного обращения', () => {
      createAppealTestCase({
        appealType: APPEAL_DETAILS.SCANNED_ACT.type,
        appealTitle: '@appealTitle',
        actions: scannedActActions,
        checks: [compareAppealFieldsCheck(scannedActChecks)],
      });
    });
  });

  describe('Запросить акт сверки', () => {
    beforeEach(() => {
      appealType.setValue(REQUEST_ACT);
    });

    it('Проверка обязательности полей', () => {
      cy.wait(1000);
      selectors.submitButton().click();

      [contractNumber, contractDate, actPeriod].forEach(
        ({ field, requiredMessage }) => {
          field.shouldRequired();
          field.isRequired
            ? field.shouldBeInvalid(requiredMessage)
            : field.shouldBeValid();
        },
      );
    });

    appealMaxCountTest();

    it('Создание одного обращения', () => {
      createAppealTestCase({
        appealType: APPEAL_DETAILS.REQUEST_ACT.type,
        appealTitle: '@appealTitle',
        actions: requestActActions,
        checks: [compareAppealFieldsCheck(requestActChecks)],
      });
    });
  });
});
