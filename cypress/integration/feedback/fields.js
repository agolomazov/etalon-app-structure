import { FIXTURE_FILES, ERROR_MESSAGES } from '@support/common/constants';

import {
  InputField,
  DropdownSelectField,
  FileField,
} from '@support/modules/fields';

export const subject = {
  field: new DropdownSelectField({
    label: 'Тема',
    name: 'subject',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  action() {
    return () => this.field.setValueByIndex(0);
  },
};

export const text = {
  field: new InputField({
    label: 'Сообщение',
    name: 'text',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: 'Все очень понравилось! Особенно FE!',
  action() {
    return () => this.field.setValue(this.type);
  },
};

export const email = {
  field: new InputField({
    label: 'Электронная почта',
    name: 'email',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: 'test@test.ru',
  action() {
    return () => this.field.setValue(this.type);
  },
};

export const file = {
  field: new FileField({
    name: 'file',
    label: 'Документ',
  }),
  action() {
    return () =>
      this.field.setValue(FIXTURE_FILES.LITTLE_PNG).shouldBeSuccess();
  },
};

export const fields = [subject, text, email, file];
