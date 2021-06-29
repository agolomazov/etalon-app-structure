import { FIXTURE_FILES, ERROR_MESSAGES } from '@support/common/constants';
import { isEnvModeDev } from '@support/common/utils';

import {
  InputField,
  DropdownSelectField,
  FileMultipleField,
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
      this.field.setValueByIndex(0).getValue().as('landlord');
    };
  },
  check() {
    return compareTextField({
      label: this.field.label,
      value: isEnvModeDev() ? ROSSIM_OFFICE_MOCK : '@landlord',
    });
  },
};

export const appealTitle = {
  field: new InputField({
    label: 'Тема обращения',
    name: 'appealTitle',
    isRequired: true,
  }),
  type: 'Случилось непредвиденное',
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
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

export const appealBody = {
  field: new InputField({
    label: 'Обращение',
    name: 'appealBody',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: 'Суть проблемы заключается в следующем...',
  messagesLabel: 'Текст обращения',
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

export const files = {
  field: new FileMultipleField({
    label: 'Документ',
    name: 'files',
  }),
  requiredMessage: ERROR_MESSAGES.FILE_REQUIRED,
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

export const fields = [rosimOffice, appealTitle, appealBody, files];
