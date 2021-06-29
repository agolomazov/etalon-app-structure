import { FIXTURE_FILES, ERROR_MESSAGES } from '@support/common/constants';
import { isEnvModeDev } from '@support/common/utils';

import { ROSSIM_OFFICE_MOCK } from '@support/modules/appeals';
import {
  InputField,
  DropdownSelectField,
  DateField,
  FileField,
} from '@support/modules/fields';
import {
  compareTextField,
  compareFileField,
} from '@support/test-cases/appeals';

/**
 * Арендодатель по договору
 */
export const landlord = {
  field: new DropdownSelectField({
    name: 'landlord',
    label: 'Арендодатель по договору',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  action() {
    return () => this.field.setValueByIndex(0).getValue().as('landloard');
  },
  check() {
    return compareTextField({
      label: this.field.label,
      value: isEnvModeDev() ? ROSSIM_OFFICE_MOCK : '@landloard',
    });
  },
};

/**
 * Номер договора
 */
export const contractNumber = {
  field: new InputField({
    name: 'contractNumber',
    label: 'Номер договора',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: '000/01',
  messageLabel: 'Договор',
  action() {
    return () => this.field.setValue(this.type);
  },
  check() {
    return compareTextField({
      label: this.messageLabel,
      value: this.type,
    });
  },
};

/**
 * Дата договора
 */
export const contractDate = {
  field: new DateField({
    name: 'contractDate',
    label: 'Дата договора',
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

/**
 * Адрес объекта
 */
export const address = {
  field: new InputField({
    name: 'address',
    label: 'Адрес объекта',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: 'Санкт-Петербург',
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

/**
 * Кадастровый номер объекта
 */
export const cadastralNumber = {
  field: new InputField({
    name: 'cadastralNumber',
    label: 'Кадастровый номер объекта',
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: '47:14:1203001:814',
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

/**
 * Документ
 */
export const file = {
  field: new FileField({
    name: 'file',
    label: 'Документ',
    description: 'Загрузите скан-копию бумажного договора',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.FILE_REQUIRED,
  messageLabel: 'Скан-копия договора',
  action() {
    return () =>
      this.field.setValue(FIXTURE_FILES.LITTLE_PNG).shouldBeSuccess();
  },
  check() {
    return compareFileField({
      label: this.messageLabel,
      value: FIXTURE_FILES.LITTLE_PNG,
    });
  },
};

/**
 * Комментарий
 */
export const comment = {
  field: new InputField({
    name: 'comment',
    label: 'Комментарий',
  }),
  type: 'комментарий',
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

/**
 * Список полей
 */
export const fields = [
  landlord,
  contractNumber,
  contractDate,
  address,
  cadastralNumber,
  file,
  comment,
];
