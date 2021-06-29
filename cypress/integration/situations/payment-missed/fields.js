import { FIXTURE_FILES, ERROR_MESSAGES } from '@support/common/constants';
import { InputField, DateField, FileField } from '@support/modules/fields';
import {
  noopAction,
  compareTextField,
  compareFileField,
} from '@support/test-cases/appeals';

import { typeContractNumberAndDateAction } from './actions';
import { contractLinkCheck } from './checks';

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
    isRequired: true,
  }),
  action() {
    return typeContractNumberAndDateAction;
  },
  check() {
    return compareTextField({
      label: this.field.label,
      value: '@contractDate',
    });
  },
};

/**
 * Плательщик
 */
export const payer = {
  field: new InputField({
    name: 'payer',
    label: 'Плательщик',
    description: 'ФИО или наименование ЮЛ',
    isRequired: true,
  }),
  type: 'Иванов Иван Иванович',
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

/**
 * Номер платёжного поручения
 */
export const paymentOrderNumber = {
  field: new InputField({
    name: 'paymentOrderNumber',
    label: 'Номер платёжного поручения',
    isRequired: true,
  }),
  type: '1001',
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

/**
 * Дата платёжного поручения
 */
export const paymentOrderDate = {
  field: new DateField({
    name: 'paymentOrderDate',
    label: 'Дата платёжного поручения',
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
 * Сумма платежа
 */
export const paymentAmount = {
  field: new InputField({
    name: 'paymentAmount',
    label: 'Сумма платежа',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: '1000',
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
 * Период платежа
 */
export const paymentPeriod = {
  field: new InputField({
    name: 'paymentPeriod',
    label: 'Период платежа',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: 'месяц',
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
 * Подтверждающий документ
 */
export const file = {
  field: new FileField({
    name: 'file',
    label: 'Подтверждающий документ',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.FILE_REQUIRED,
  action() {
    return () =>
      this.field.setValue(FIXTURE_FILES.LITTLE_PNG).shouldBeSuccess();
  },
  check() {
    return compareFileField({
      label: this.field.label,
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
  contractNumber,
  contractDate,
  payer,
  paymentOrderNumber,
  paymentOrderDate,
  paymentAmount,
  paymentPeriod,
  file,
  comment,
];
