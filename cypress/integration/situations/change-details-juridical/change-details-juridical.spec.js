import { PERMISSIONS_MOCK, ERROR_MESSAGES } from '@support/common/constants';
import { selectors } from '@support/common/selectors';

import { FileMultipleField } from '@support/modules/fields';

import {
  APPEAL_DETAILS,
  visitLifeSituation,
  visitLifeSituations,
  checkExistsHeaderWithBackButton,
} from '@support/modules/appeals';

import {
  createAppealTestCase,
  compareAppealFieldsCheck,
  multipleFilesUploadTestCase,
} from '@support/test-cases/appeals';

import {
  appealType,
  email,
  changeJuridicalAddressFields,
  changeOrganizationalLegalFormFields,
  changeCompanyNameFields,
  changeContactDetailsFields,
  changeDirectorFields,
} from './fields';

const LIFE_SITUATION_CAPTION = 'Изменить реквизиты Арендатора';
const LIFE_SITUATION_TILE_TEXT = LIFE_SITUATION_CAPTION;

const CHANGE_JURIDICAL_ADDRESS = 'Смена юридического адреса/КПП';
const CHANGE_ORGANIZATIONAL_LEGAL_FORM =
  'Смена организационно-правовой формы/ИНН';
const CHANGE_COMPANY_NAME = 'Смена наименования ЮЛ';
const CHANGE_CONTACT_DETAILS = 'Смена контактных данных';
const CHANGE_DIRECTOR = 'Смена руководителя';

const appealTypes = [
  {
    appealCaption: CHANGE_JURIDICAL_ADDRESS,
    appealDetails: APPEAL_DETAILS.CHANGE_JURIDICAL_ADDRESS,
    appealFields: changeJuridicalAddressFields,
  },
  {
    appealCaption: CHANGE_ORGANIZATIONAL_LEGAL_FORM,
    appealDetails: APPEAL_DETAILS.CHANGE_ORGANIZATIONAL_LEGAL_FORM,
    appealFields: changeOrganizationalLegalFormFields,
  },
  {
    appealCaption: CHANGE_COMPANY_NAME,
    appealDetails: APPEAL_DETAILS.CHANGE_COMPANY_NAME,
    appealFields: changeCompanyNameFields,
  },
  {
    appealCaption: CHANGE_CONTACT_DETAILS,
    appealDetails: APPEAL_DETAILS.CHANGE_CONTACT_DETAILS,
    appealFields: changeContactDetailsFields,
    additionalValidation: () => {
      email.field
        .setValue('wrong-email')
        .shouldBeInvalid(ERROR_MESSAGES.WRONG_EMAIL);
    },
  },
  {
    appealCaption: CHANGE_DIRECTOR,
    appealDetails: APPEAL_DETAILS.CHANGE_DIRECTOR,
    appealFields: changeDirectorFields,
  },
];

const describeAppealTests = ({
  appealCaption,
  appealDetails,
  appealFields,
  additionalValidation,
}) => {
  describe(appealCaption, () => {
    beforeEach(() => {
      appealType.field.setValue(appealCaption);
      cy.get('.loader-container').should('not.exist');
    });

    it('Проверка наименований элементов формы', () => {
      appealFields.forEach(({ field }) => field.shouldExist());
    });

    it('Проверка валидации полей', () => {
      selectors.submitButton().click();

      appealFields.forEach(({ field, requiredMessage }) => {
        field.shouldRequired();
        field.isRequired
          ? field.shouldBeInvalid(requiredMessage)
          : field.shouldBeValid();
      });

      additionalValidation && additionalValidation();
    });

    const files = appealFields.find(
      ({ field }) => field instanceof FileMultipleField,
    );

    if (files) {
      it('Проверка загрузки файлов разных размеров', () => {
        multipleFilesUploadTestCase(files.field);
      });
    }

    it('Создание обращения', () => {
      createAppealTestCase({
        appealType: appealDetails.type,
        appealTitle: appealDetails.title(),
        actions: appealFields.map((field) => field.action()),
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
  describe('Авторизация под ЮЛ', () => {
    before(() => {
      cy.loginByJuridical(PERMISSIONS_MOCK);
    });

    beforeEach(() => {
      visitLifeSituation(LIFE_SITUATION_TILE_TEXT);
    });

    it('Проверка заголовка ЖС', () => {
      checkExistsHeaderWithBackButton(LIFE_SITUATION_CAPTION);
    });

    it('Выпадающий список должен содержать 5 типов обращений', () => {
      cy.contains('1. Выберите причину внесения изменений').should('exist');
      appealType.field.shouldHaveItems(
        appealTypes.map(({ appealCaption }) => appealCaption),
      );
    });

    appealTypes.forEach((params) => describeAppealTests(params));
  });

  it('ЖС должна быть недоступна для Арендаторов ИП', () => {
    cy.loginByEntrepreneur();
    visitLifeSituations();
    cy.contains(LIFE_SITUATION_CAPTION).should('not.exist');
  });

  it('ЖС должна быть недоступна для Арендаторов ФЛ', () => {
    cy.loginByNatural();
    visitLifeSituations();
    cy.contains(LIFE_SITUATION_CAPTION).should('not.exist');
  });
});
