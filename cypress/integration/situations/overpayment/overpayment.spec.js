import { PERMISSIONS_MOCK, ERROR_MESSAGES } from '@support/common/constants';
import { formatServerDateToDisplayDate } from '@support/common/utils';
import { selectors } from '@support/common/selectors';

import {
  APPEAL_DETAILS,
  visitLifeSituation,
  checkExistsHeaderWithBackButton,
} from '@support/modules/appeals';

import {
  createAppealTestCase,
  singleFileUploadTestCase,
  compareAppealFieldsCheck,
} from '@support/test-cases/appeals';

import {
  appealType,
  recipientType,
  personInn,
  companyInn,
  paymentOrderFile,
  scannedAppealFile,
  downloadOffsetToDifferentAppeal,
  downloadRefundAppeal,
  offsetToDifferentFields,
  refundNaturalFields,
  refundJuridicalFields,
  refundFiscalOrganizationFields,
} from './fields';

const LIFE_SITUATION_CAPTION = 'Распорядиться переплатой';
const LIFE_SITUATION_TILE_TEXT = LIFE_SITUATION_CAPTION;

/** Тип обращения */
const OFFSET_TO_DIFFERENT_CONTRACT = 'Зачет денежных средств на другой договор';
const OVERPAYMENT_REFUND = 'Возврат денежных средств';

/** Тип получателя */
const RECIPIENT_NATURAL_PERSON = 'Физическое лицо';
const RECIPIENT_JURIDICAL_PERSON = 'Юридическое лицо';
const RECIPIENT_FISCAL_ORGANIZATION = 'Бюджетная организация';

export const waitContracts = () => {
  cy.wait('@fetchContracts').then(({ response }) => {
    const contracts = response.body.content;

    const { id: contractId, number: contractNumber, date } = contracts[0];

    const contractDate = formatServerDateToDisplayDate(date);

    cy.wrap(contractId).as('contractId');
    cy.wrap(contractNumber).as('contractNumber');
    cy.wrap(contractDate).as('contractDate');
  });
};

const appealTypes = [
  {
    appealCaption: OFFSET_TO_DIFFERENT_CONTRACT,
    appealDetails: APPEAL_DETAILS.OFFSET_TO_DIFFERENT_CONTRACT,
    appealFields: offsetToDifferentFields,
    appealDownloadField: downloadOffsetToDifferentAppeal.field,
    additionalTests: () => {
      it('Проверка загрузки файлов разных размеров', () => {
        singleFileUploadTestCase(paymentOrderFile.field);
        singleFileUploadTestCase(scannedAppealFile.field);
      });
    },
  },
  {
    appealCaption: OVERPAYMENT_REFUND,
    appealSubCaption: ', получатель ФЛ',
    appealDetails: APPEAL_DETAILS.OVERPAYMENT_REFUND,
    appealFields: refundNaturalFields,
    appealDownloadField: downloadRefundAppeal.field,
    beforeEach: () => recipientType.field.setValue(RECIPIENT_NATURAL_PERSON),
    additionalValidation: () => {
      personInn.field
        .setValue('111111111111')
        .shouldBeInvalid(ERROR_MESSAGES.WRONG_NATURAL_INN);
    },
    additionalTests: () => {
      it('Проверка загрузки файлов разных размеров', () => {
        singleFileUploadTestCase(paymentOrderFile.field);
        singleFileUploadTestCase(scannedAppealFile.field);
      });
    },
  },
  {
    appealCaption: OVERPAYMENT_REFUND,
    appealSubCaption: ', получатель ЮЛ',
    appealDetails: APPEAL_DETAILS.OVERPAYMENT_REFUND,
    appealFields: refundJuridicalFields,
    appealDownloadField: downloadRefundAppeal.field,
    beforeEach: () => recipientType.field.setValue(RECIPIENT_JURIDICAL_PERSON),
    additionalValidation: () => {
      companyInn.field
        .setValue('1111111111')
        .shouldBeInvalid(ERROR_MESSAGES.WRONG_JURIDICAL_INN);
    },
  },
  {
    appealCaption: OVERPAYMENT_REFUND,
    appealSubCaption: ', получатель Бюджетная организация',
    appealDetails: APPEAL_DETAILS.OVERPAYMENT_REFUND,
    appealFields: refundFiscalOrganizationFields,
    appealDownloadField: downloadRefundAppeal.field,
    beforeEach: () =>
      recipientType.field.setValue(RECIPIENT_FISCAL_ORGANIZATION),
    additionalValidation: () => {
      companyInn.field
        .setValue('1111111111')
        .shouldBeInvalid(ERROR_MESSAGES.WRONG_JURIDICAL_INN);
    },
  },
];

const describeAppealTests = ({
  appealCaption,
  appealSubCaption = '',
  appealDetails,
  appealFields,
  appealDownloadField,
  beforeEach: beforeEachDo,
  additionalValidation,
  additionalTests,
}) => {
  describe(`${appealCaption}${appealSubCaption}`, () => {
    beforeEach(() => {
      appealType.field.setValue(appealCaption);
      cy.get('.loader-container').should('not.exist');
      beforeEachDo && beforeEachDo();
    });

    it('Проверка наименований элементов формы', () => {
      appealFields
        .filter(({ field }) => !!field)
        .forEach(({ field }) => field.shouldExist());
    });

    it('Проверка валидации полей', () => {
      selectors.submitButton().click();

      appealFields
        .filter(({ field }) => !!field)
        .forEach(({ field, requiredMessage }) => {
          field.shouldRequired();
          field.isRequired
            ? field.shouldBeInvalid(requiredMessage)
            : field.shouldBeValid();
        });

      additionalValidation && additionalValidation();
    });

    additionalTests && additionalTests();

    it('Проверка на скачивание заявления по обращению', () => {
      waitContracts();

      cy.intercept('/appeal-document/form').as('appealDocument');
      appealFields
        .filter(({ action }) => !!action)
        .forEach((field) => field.action()());
      appealDownloadField.download();
      cy.wait('@appealDocument');
      appealDownloadField.shouldDownload();
    });

    it('Создание обращения', () => {
      waitContracts();

      cy.getAliases([
        '@contractNumber',
        '@contractDate',
      ]).then(([contractNumber, contractDate]) =>
        cy
          .wrap(appealDetails.title(contractNumber, contractDate))
          .as('appealTitle'),
      );

      createAppealTestCase({
        appealType: appealDetails.type,
        appealTitle: '@appealTitle',
        actions: appealFields
          .filter(({ action }) => !!action)
          .map((field) => field.action()),
        checks: [
          compareAppealFieldsCheck(
            appealFields
              .filter(({ check }) => !!check)
              .map((field) => field.check()),
          ),
        ],
      });
    });
  });
};

describe(LIFE_SITUATION_CAPTION, () => {
  before(() => {
    cy.loginByJuridical(PERMISSIONS_MOCK);
  });

  beforeEach(() => {
    cy.intercept(/contract$/).as('fetchContracts');
    visitLifeSituation(LIFE_SITUATION_TILE_TEXT);
  });

  it('Проверка заголовка ЖС', () => {
    checkExistsHeaderWithBackButton(LIFE_SITUATION_CAPTION);
  });

  it('Выпадающий список должен содержать 2 типа обращений', () => {
    appealType.field.shouldHaveItems([
      OFFSET_TO_DIFFERENT_CONTRACT,
      OVERPAYMENT_REFUND,
    ]);
  });

  appealTypes.forEach((params) => describeAppealTests(params));
});
