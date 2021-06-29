import { FIXTURE_FILES, ERROR_MESSAGES } from '@support/common/constants';
import { isEnvModeDev } from '@support/common/utils';

import {
  InputField,
  DropdownSelectField,
  FileMultipleField,
  DateField,
} from '@support/modules/fields';

import { ROSSIM_OFFICE_MOCK } from '@support/modules/appeals/constants';

import {
  compareTextField,
  compareFileField,
} from '@support/test-cases/appeals';

export const rosimOffice = {
  field: new DropdownSelectField({
    label: 'Территориальный орган',
    description: 'Росимущества',
    name: 'rosimOffice',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  action() {
    return () => {
      this.field.setValueByIndex(0);
      isEnvModeDev()
        ? cy.wrap(ROSSIM_OFFICE_MOCK).as('landlord')
        : this.field.getValue().as('landlord');
    };
  },
  check() {
    return compareTextField({
      label: this.field.label,
      value: isEnvModeDev() ? ROSSIM_OFFICE_MOCK : '@landlord',
    });
  },
};

export const appealType = new DropdownSelectField({
  label: 'Оформить жалобу',
  name: 'appealType',
});

export const documentNumber = {
  field: new InputField({
    label: 'Номер документа',
    name: 'documentNumber',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: '12345',
  messagesLabel: 'Документ',
  action() {
    return () => this.field.setValue(this.type);
  },
  check() {
    return compareTextField({
      label: this.messagesLabel,
      value: this.type,
    });
  },
};

export const documentDate = {
  field: new DateField({
    label: 'Дата документа',
    name: 'documentDate',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: '01.01.2021',
  action() {
    return () => this.field.setValue(this.type);
  },
  check() {
    return compareTextField({
      label: this.field.label,
      value: this.type,
    });
  },
};

export const complaintReason = {
  field: new InputField({
    label: 'Основание для подачи жалобы',
    name: 'complaintReason',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: 'Текст основания для подачи жалобы',
  action() {
    return () => this.field.setValue(this.type);
  },
  check() {
    return compareTextField({
      label: this.field.label,
      value: this.type,
    });
  },
};

export const userDemand = {
  field: new InputField({
    label: 'Требования лица, подающего жалобу',
    name: 'userDemand',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: 'Текст требования пользователя',
  action() {
    return () => this.field.setValue(this.type);
  },
  check() {
    return compareTextField({
      label: this.field.label,
      value: this.type,
    });
  },
};

export const files = {
  field: new FileMultipleField({
    name: 'files',
    label: 'Документ',
    description: 'Загрузите файлы по обращению',
  }),
  messagesLabel: 'Документы',
  action() {
    return () =>
      this.field
        .setValue(FIXTURE_FILES.LITTLE_PNG)
        .shouldHaveFiles([FIXTURE_FILES.LITTLE_PNG]);
  },
  check() {
    return compareFileField({
      label: this.messagesLabel,
      value: FIXTURE_FILES.LITTLE_PNG,
    });
  },
};

export const complainDocumentFields = [
  rosimOffice,
  documentNumber,
  documentDate,
  complaintReason,
  userDemand,
  files,
];

export const complainActionFields = [
  rosimOffice,
  complaintReason,
  userDemand,
  files,
];
