import { ERROR_MESSAGES, PERMISSIONS_MOCK } from '@support/common/constants';
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
  fields,
  contractNumber,
  contractDate,
  cadastralNumber,
  file,
} from './fields';

const LIFE_SITUATION_CAPTION =
  'В Личном кабинете отсутствует информация о моем договоре аренды';
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

    fields.forEach(({ field }) => field.shouldExist());
  });

  it('Проверка валидации полей', () => {
    selectors.submitButton().click();

    fields.forEach(({ field, requiredMessage }) => {
      field.shouldRequired();
      field.isRequired
        ? field.shouldBeInvalid(requiredMessage)
        : field.shouldBeValid();
    });

    cadastralNumber.field
      .setValue('12345')
      .shouldBeInvalid(ERROR_MESSAGES.WRONG_CADASTRAL_NUMBER)
      .setValue(cadastralNumber.type)
      .shouldBeValid();
  });

  it('Проверка загрузки файлов разных размеров', () => {
    singleFileUploadTestCase(file.field);
  });

  it('Создание обращения', () => {
    createAppealTestCase({
      appealType: APPEAL_DETAILS.MISSING_CONTRACT_IN_LK.type,
      appealTitle: APPEAL_DETAILS.MISSING_CONTRACT_IN_LK.title(
        contractNumber.type,
        contractDate.type,
      ),
      actions: Object.values(fields).map((field) => field.action()),
      checks: [
        compareAppealFieldsCheck(
          Object.values(fields).map((field) => field.check()),
        ),
      ],
    });
  });
});
