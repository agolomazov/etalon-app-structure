import { FIXTURE_FILES, ERROR_MESSAGES } from '@support/common/constants';
import {
  InputField,
  DateField,
  FileField,
  DateRangeField,
} from '@support/modules/fields';

import {
  noopAction,
  compareTextField,
  compareFileField,
  compareDatePeriodField,
} from '@support/test-cases/appeals';

import { contractLinkCheck } from './checks';
import { typeContractNumberAndGetDatesAction } from './actions';

/**
 * Номер договора
 */
export const contract = {
  field: new InputField({
    name: 'contract',
    label: 'Номер договора',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  messageLabel: 'Договор',
  action() {
    return noopAction;
  },
  check() {
    return [
      compareTextField({
        label: this.messageLabel,
        value: '@contractNumber',
      }),
      contractLinkCheck,
    ];
  },
};

/**
 * Дата договора
 */
export const contractDate = {
  field: new InputField({
    name: 'contractDate',
    label: 'Дата договора',
  }),
  action() {
    return typeContractNumberAndGetDatesAction;
  },
  check() {
    return compareTextField({
      label: this.field.label,
      value: '@contractDate',
    });
  },
};

/**
 * Имя субарендатора
 */
export const subtenant = {
  field: new InputField({
    name: 'subtenant',
    label: 'Субарендатор',
    description: 'ФИО или наименование ЮЛ',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: 'Иванов Иван Иванович',
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
 * ИНН субарендатора
 */
export const subtenantInn = {
  field: new InputField({
    name: 'subtenantInn',
    label: 'ИНН',
    description: 'Субарендатора',
    isRequired: true,
  }),
  messageLabel: 'ИНН субарендатора',
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: '0000000000',
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
 * Номер договора субарендатора
 */
export const subtenantContractNumber = {
  field: new DateField({
    name: 'subtenantContractNumber',
    label: 'Номер договора',
    description: 'Субаренды',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  messageLabel: 'Номер договора субаренды',
  type: '123',
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
 * Дата договора субарендатора
 */
export const subtenantContractDate = {
  field: new DateField({
    name: 'subtenantContractDate',
    label: 'Дата договора',
    description: 'Субаренды',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  messageLabel: 'Дата договора субаренды',
  type: '01.01.2020',
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
 * Период действия договора субарендатора
 */
export const subtenantDatePeriod = {
  field: new DateRangeField({
    name: 'subtenantDatePeriod',
    label: 'Период действия договора',
    description: 'Субаренды',
    isRequired: true,
  }),
  messageLabel: 'Период действия договора субаренды',
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  action() {
    return noopAction;
  },
  check() {
    return compareDatePeriodField({
      label: this.messageLabel,
      value: '@subleasePeriod',
    });
  },
};

/**
 * Скан договора субаренды
 */
export const file = {
  field: new FileField({
    name: 'file',
    label: 'Договор',
    description: 'Загрузите скан-копию договора субаренды',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.FILE_REQUIRED,
  messageLabel: 'Скан-копия договор субаренды',
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
  contract,
  contractDate,
  subtenant,
  subtenantInn,
  subtenantContractNumber,
  subtenantContractDate,
  subtenantDatePeriod,
  file,
  comment,
];
