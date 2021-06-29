import { PERMISSIONS_MOCK, ERROR_MESSAGES } from '@support/common/constants';

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
  contractDate,
  comment,
  file,
  objectAdress,
  objectType,
  changesSelect,
  changeAdressValue,
  changeCadastralValue,
  changeObjectIntendValue,
  changePermisionType,
  changeCategoryValue,
  anyObjectTypeFields,
  landPlotFields,
  missedFields,
  setFields,
} from './fields';

import { getMissingData } from './actions';

const LIFE_SITUATION_TILE_TEXT =
  'Внести изменения в характеристики арендованных объектов';
const LIFE_SITUATION_CAPTION = LIFE_SITUATION_TILE_TEXT;
const CHANGE_OBJECT_INFO = 'Внести изменения в характеристики объектов';
const MISSING_DATA = 'Сообщить об отсутствии данных по объектам';

const OBJECT_TYPES = [
  'Земельный участок',
  'Здания, сооружения',
  'Доли в праве',
  'Движимое имущество',
  'Воздушные и морские суда',
  'Имущественный комплекс',
  'Иное движимое имущество',
  'Комплекс земельных участков',
  'Помещения',
];
const LAND_CATEGORIES = [
  'Земли сельскохозяйственного значения',
  'Земли населенных пунктов',
  'Земли промышленности и иного специального назначения',
  'Земли особо охраняемых территорий и объектов',
  'Земли лесного фонда',
  'Земли водного фонда',
  'Земли запаса',
];

describe(LIFE_SITUATION_CAPTION, () => {
  before(() => {
    cy.loginByJuridical(PERMISSIONS_MOCK);
  });

  beforeEach(() => {
    cy.intercept(/contract$/).as('fetchContracts');
    cy.intercept('/facility-rental').as('facilityRentalData');
    cy.intercept('/missing-facility-data').as('missingData');
    visitLifeSituation(LIFE_SITUATION_TILE_TEXT);
  });

  it('Проверка заголовка ЖС, наименований элементов формы', () => {
    checkExistsHeaderWithBackButton(LIFE_SITUATION_CAPTION);

    cy.contains(
      '1. Выберите арендованный объект, характеристики которого требуют уточнений',
    ).should('exist');
    contractDate.action()();
    cy.wait('@missingData');

    appealType
      .shouldExist()
      .shouldHaveItems([CHANGE_OBJECT_INFO, MISSING_DATA])
      .setValue(MISSING_DATA);
    cy.contains('Отсутствующая информация').should('exist');
    cy.get(':nth-child(8) > .list').should('exist');
    comment.field.shouldExist();

    appealType.setValue(CHANGE_OBJECT_INFO);
    cy.contains(
      '2. Укажите характеристики, которые требуют внесения изменений',
    ).should('exist');
    [
      file,
      objectAdress,
      objectType,
      comment,
      changesSelect,
    ].forEach(({ field }) => field.shouldExist());
    objectType.field.shouldHaveItems(OBJECT_TYPES);
  });

  describe(CHANGE_OBJECT_INFO, () => {
    beforeEach(() => {
      contractDate.action()();
      appealType.setValue(CHANGE_OBJECT_INFO);
      cy.get('.loader-container').should('not.exist');
    });

    it('Проверка обязательности базовых полей', () => {
      selectors.submitButton().click();
      [objectAdress, objectType, changesSelect].forEach(
        ({ field, requiredMessage }) => {
          field.shouldRequired();
          field.isRequired
            ? field.shouldBeInvalid(requiredMessage)
            : field.shouldBeValid();
        },
      );
    });

    it('Проверка предзаполнения адреса', () => {
      objectType.action()();
    });

    it('Проверка наличия, обязательности, валидации полей, для любого тип объекта', () => {
      changesSelect.field.setValue('Выбрать все');
      anyObjectTypeFields.forEach(({ field }) => field.shouldExist());
      selectors.submitButton().click();
      [
        objectAdress,
        objectType,
        changeAdressValue,
        changeCadastralValue,
        changeObjectIntendValue,
      ].forEach(({ field, requiredMessage }) => {
        field.shouldRequired();
        field.isRequired
          ? field.shouldBeInvalid(requiredMessage)
          : field.shouldBeValid();
      });
      changeCadastralValue.field
        .setValue('12345')
        .shouldBeInvalid(ERROR_MESSAGES.WRONG_CADASTRAL_NUMBER);
    });

    it('Проверка наличия, обязательности, валидации полей, для земельного участка', () => {
      objectType.field.setValue('Земельный участок');
      changesSelect.field.setValue('Выбрать все');
      landPlotFields.forEach(({ field }) => field.shouldExist());
      changeCategoryValue.field.shouldHaveItems(LAND_CATEGORIES);
      selectors.submitButton().click();
      [
        objectAdress,
        changeAdressValue,
        changeCadastralValue,
        changePermisionType,
        changeCategoryValue,
      ].forEach(({ field, requiredMessage }) => {
        field.shouldRequired();
        field.isRequired
          ? field.shouldBeInvalid(requiredMessage)
          : field.shouldBeValid();
      });
      changeCadastralValue.field
        .setValue('12345')
        .shouldBeInvalid(ERROR_MESSAGES.WRONG_CADASTRAL_NUMBER);
    });

    it('Проверка загрузки файлов разных размеров', () => {
      singleFileUploadTestCase(file.field);
    });

    it('Создание обращения, тип объекта Земельный участок', () => {
      objectAdress.field.setValue('адрес').getValue().as('facilityAddress');
      objectType.field
        .setValue('Земельный участок')
        .getValue()
        .as('facilityType');
      changesSelect.field.setValue('Выбрать все');
      createAppealTestCase({
        appealType: APPEAL_DETAILS.CHANGE_FACILITY_RENTAL.type,
        appealTitle: '@appealTitleChangeFacilityRental',
        actions: [file, comment, ...landPlotFields].map((field) =>
          field.action(),
        ),
        checks: [
          compareAppealFieldsCheck(
            setFields(landPlotFields).map((field) => field.check()),
          ),
        ],
      });
    });

    it('Создание обращения, любой тип объекта', () => {
      objectAdress.field.setValue('адрес').getValue().as('facilityAddress');
      objectType.field.setValue('Помещения').getValue().as('facilityType');
      changesSelect.field.setValue('Выбрать все');

      createAppealTestCase({
        appealType: APPEAL_DETAILS.CHANGE_FACILITY_RENTAL.type,
        appealTitle: '@appealTitleChangeFacilityRental',
        actions: [file, comment, ...anyObjectTypeFields].map((field) =>
          field.action(),
        ),
        checks: [
          compareAppealFieldsCheck(
            setFields(anyObjectTypeFields).map((field) => field.check()),
          ),
        ],
      });
    });

    it('Создание обращения, c предзаполненным адресом', () => {
      objectType.action()();
      changesSelect.field.setValue('Адрес объекта');
      cy.get('@facilityCadastralNumber').then((cadastral) => {
        createAppealTestCase({
          appealType: APPEAL_DETAILS.CHANGE_FACILITY_RENTAL.type,
          appealTitle: '@appealTitleChangeFacilityRental',
          actions: [file, comment, changeAdressValue].map((field) =>
            field.action(),
          ),
          checks: [
            compareAppealFieldsCheck(
              setFields([changeAdressValue], cadastral).map((field) =>
                field.check(),
              ),
            ),
          ],
        });
      });
    });
  });

  describe(MISSING_DATA, () => {
    it('Создание обращения', () => {
      contractDate.action()();
      appealType.setValue(MISSING_DATA);
      getMissingData();
      comment.action()();

      createAppealTestCase({
        appealType: APPEAL_DETAILS.MISSING_DATA_IN_FACILITY.type,
        appealTitle: '@appealTitleMissingData',
        checks: [
          compareAppealFieldsCheck(missedFields.map((field) => field.check())),
        ],
      });
    });
  });
});
