import { FIXTURE_FILES, ERROR_MESSAGES } from '@support/common/constants';
import { getToday } from '@support/common/utils';
import {
  InputField,
  DropdownSelectField,
  DateField,
  FileField,
  DownloadField,
} from '@support/modules/fields';

import {
  compareFileField,
  compareTextField,
} from '@support/test-cases/appeals';

/** Причина переплаты */
const REASON_MISTAKE = 'Ошибочное перечисление';
const REASON_OVERDRAFT = 'Излишнее перечисление';

/** Тип обязательства */
const OBLIGATION_PRINCIPAL = 'Основное обязательство';
const OBLIGATION_PENALTY = 'Пени';

/** Номер договора */
export const contractNumber = {
  field: new InputField({
    name: 'contract',
    label: 'Номер договора',
    isRequired: true,
  }),
  messagesLabel: 'Договор',
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  action() {
    return () => this.field.setValue('@contractNumber');
  },
  check() {
    return compareTextField({
      label: this.messagesLabel,
      value: '@contractNumber',
    });
  },
};

/** Дата договора */
export const contractDate = {
  field: new DateField({
    name: 'contractDate',
    label: 'Дата договора',
  }),
  action() {
    return () =>
      this.field.shouldHaveValue('@contractDate').shouldBeDisabled(true);
  },
  check() {
    return compareTextField({
      label: this.field.label,
      value: '@contractDate',
    });
  },
};

/** Тип обращения */
export const appealType = {
  field: new DropdownSelectField({
    name: 'appealType',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
};

/** Сумма (Требующая перезачета / К возврату) */
const createAmountField = ({ description, messagesLabel }) => ({
  field: new InputField({
    name: 'amount',
    label: 'Сумма',
    description,
    isRequired: true,
  }),
  type: '2000',
  messagesLabel,
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  action() {
    return () => this.field.setValue(this.type);
  },
  check() {
    return compareTextField({
      label: this.messagesLabel,
      value: this.type,
    });
  },
});

/** Сумма (требующая перезачета) */
export const offsetToDifferentAmount = createAmountField({
  description: 'Требующая перезачета',
  messagesLabel: 'Сумма, требующая перезачета',
});

/** Сумма (к возврату) */
export const refundAmount = createAmountField({
  description: 'К возврату',
  messagesLabel: 'Сумма к возврату',
});

/** Причина переплаты */
export const reason = {
  field: new DropdownSelectField({
    name: 'reason',
    label: 'Причина переплаты',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  action() {
    return () => this.field.setValue(REASON_MISTAKE);
  },
  check() {
    return compareTextField({
      label: this.field.label,
      value: REASON_MISTAKE,
    });
  },
};

/** Тип обязательства */
export const contractObligationType = {
  field: new DropdownSelectField({
    name: 'contractObligationType',
    label: 'Тип обязательства',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  action() {
    return () => this.field.setValue(OBLIGATION_PRINCIPAL);
  },
  check() {
    return compareTextField({
      label: this.field.label,
      value: OBLIGATION_PRINCIPAL,
    });
  },
};

/** Номер платежного поручения */
export const paymentOrderNumber = {
  field: new InputField({
    name: '1@@paymentOrderNumber',
    label: 'Номер платежного поручения',
    description: 'Приведшего к переплате',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: '100',
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

/** Дата платежного поручения */
export const paymentOrderDate = {
  field: new DateField({
    name: '1@@paymentOrderDate',
    label: 'Дата платежного поручения',
    description: 'Приведшего к переплате',
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

/** Подтверждающий документ */
export const paymentOrderFile = {
  field: new FileField({
    name: '1@@paymentOrderFile',
    label: 'Подтверждающий документ',
    description: 'Загрузите скан-копию платежного документа',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.FILE_REQUIRED,
  action() {
    return () => this.field.appendFile(FIXTURE_FILES.ONE_PNG).shouldBeSuccess();
  },
  check() {
    return compareFileField({
      label: this.field.label,
      value: FIXTURE_FILES.ONE_PNG,
    });
  },
};

/** Номер договора при зачете ДС */
export const transferContractNumber = {
  field: new InputField({
    name: 'transferContractNumber',
    label: 'Номер договора',
    isRequired: true,
  }),
  messagesLabel: 'Договор, в счет которого будет произведен перезачет',
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: '000/000',
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

/** Дата договора при зачете ДС */
export const transferContractDate = {
  field: new DateField({
    name: 'transferContractDate',
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

/** Тип обязательства при зачете ДС */
export const transferObligationType = {
  field: new DropdownSelectField({
    name: 'transferObligationType',
    label: 'Тип обязательства',
    isRequired: true,
  }),
  messagesLabel: 'Тип обязательства для перезачета',
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  action() {
    return () => this.field.setValue(OBLIGATION_PRINCIPAL);
  },
  check() {
    return compareTextField({
      label: this.messagesLabel,
      value: OBLIGATION_PRINCIPAL,
    });
  },
};

/** Период погашения обязательства при зачете ДС */
export const transferPeriod = {
  field: new InputField({
    name: 'transferPeriod',
    label: 'Период погашения обязательства',
    isRequired: true,
  }),
  messagesLabel: 'Период погашения обязательства',
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: '1 квартал 2021',
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

/** Тип получателя */
export const recipientType = {
  field: new DropdownSelectField({
    name: 'recipientType',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
};

/** Фамилия Имя Отчество получателя */
export const personFio = {
  field: new InputField({
    name: 'personFio',
    label: 'Фамилия Имя Отчество получателя',
    isRequired: true,
  }),
  messagesLabel: 'ФИО получателя',
  type: 'Иванов Иван Иванович',
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
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

/** ИНН получателя */
export const personInn = {
  field: new InputField({
    name: 'personInn',
    label: 'ИНН',
    isRequired: true,
  }),
  type: '000000000000',
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

/** Серия паспорта */
export const passportSeries = {
  field: new InputField({
    name: 'passportSeries',
    label: 'Серия',
    isRequired: true,
  }),
  type: '4504',
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

/** Номер паспорта */
export const passportNumber = {
  field: new InputField({
    name: 'passportNumber',
    label: 'Номер',
    isRequired: true,
  }),
  type: '000001',
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

/** Кем выдан паспорт */
export const passportFmsUnit = {
  field: new InputField({
    name: 'passportFmsUnit',
    label: 'Кем выдан',
    isRequired: true,
  }),
  type: 'выдан в городе Москве',
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

/** Дата выдачи паспорта */
export const passportDate = {
  field: new DateField({
    name: 'passportDate',
    label: 'Дата выдачи',
    isRequired: true,
  }),
  type: '01.01.2011',
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

/** Наименование организации */
export const companyName = {
  field: new InputField({
    name: 'companyName',
    label: 'Наименование организации',
    isRequired: true,
  }),
  type: 'ООО РОГА И КОПЫТА',
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

/** ИНН организации */
export const companyInn = {
  field: new InputField({
    name: 'companyInn',
    label: 'ИНН',
    isRequired: true,
  }),
  type: '3664069397',
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

/** КПП организации */
export const companyKpp = {
  field: new InputField({
    name: 'companyKpp',
    label: 'КПП',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  type: '773301001',
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

/** Наименование банка  */
export const bank = {
  field: new InputField({
    name: 'bank',
    label: 'Наименование банка',
    isRequired: true,
  }),
  type: 'Банк Москва',
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

/** БИК */
export const bik = {
  field: new InputField({
    name: 'bik',
    label: 'БИК',
    isRequired: true,
  }),
  type: '044525974',
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

/** Банковский счет */
export const bankAccount = {
  field: new InputField({
    name: 'bankAccount',
    label: 'Банковский счет',
    isRequired: true,
  }),
  type: '40817810099910004312',
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

/** Корреспондентский счет */
export const correspondentAccount = {
  field: new InputField({
    name: 'correspondentAccount',
    label: 'Корреспондентский счет',
    isRequired: true,
  }),
  type: '30101643600000000957',
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

/** Лицевой счет */
export const personalAccount = {
  field: new InputField({
    name: 'personalAccount',
    label: 'Лицевой счет',
    isRequired: true,
  }),
  type: '40817810099910004312',
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

/** КБК */
export const kbk = {
  field: new InputField({
    name: 'kbk',
    label: 'КБК',
    isRequired: true,
  }),
  type: '18210102010011000110',
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

const createDownloadAppealField = (appealDocName) => ({
  field: new DownloadField({
    label: 'Заявление',
    name: 'download',
    fileName: `${appealDocName}_${getToday()}.pdf`,
    fieldDescription:
      'Распечатайте заявление на бланке организации (при его наличии), поставьте подпись и печать.',
  }),
});

/** Скачать заявление о зачете денежных средств */
export const downloadOffsetToDifferentAppeal = createDownloadAppealField(
  'Заявление о зачете денежных средств',
);

/** Скачать заявление о возврате денежных средств */
export const downloadRefundAppeal = createDownloadAppealField(
  'Заявление о возврате денежных средств',
);

/** Загрузите скан-образ подписанного заявления */
export const scannedAppealFile = {
  field: new FileField({
    name: 'scannedAppealFile',
    label: 'Загрузите скан-образ подписанного заявления',
    isRequired: true,
  }),
  messagesLabel: 'Cкан-образ подписанного заявления',
  requiredMessage: ERROR_MESSAGES.FILE_REQUIRED,
  action() {
    return () => this.field.appendFile(FIXTURE_FILES.TWO_PNG).shouldBeSuccess();
  },
  check() {
    return compareFileField({
      label: this.messagesLabel,
      value: FIXTURE_FILES.TWO_PNG,
    });
  },
};

export const noop = {
  check() {
    return () => null;
  },
};

export const offsetToDifferentFields = [
  contractNumber,
  contractDate,
  offsetToDifferentAmount,
  reason,
  contractObligationType,
  paymentOrderNumber,
  paymentOrderDate,
  paymentOrderFile,
  transferContractNumber,
  transferContractDate,
  transferObligationType,
  transferPeriod,
  downloadOffsetToDifferentAppeal,
  scannedAppealFile,
];

const createRefundFields = (fields = []) => [
  contractNumber,
  contractDate,
  refundAmount,
  reason,
  paymentOrderNumber,
  paymentOrderDate,
  paymentOrderFile,
  ...fields,
  downloadRefundAppeal,
  scannedAppealFile,
];

const naturalFields = [
  personFio,
  personInn,
  noop,
  passportSeries,
  passportNumber,
  passportFmsUnit,
  passportDate,
  noop,
  bank,
  bik,
  bankAccount,
  correspondentAccount,
];

const juridicalFields = [
  companyName,
  companyInn,
  companyKpp,
  noop,
  bank,
  bik,
  bankAccount,
  correspondentAccount,
];

const fiscalOrganizationFields = [
  companyName,
  companyInn,
  companyKpp,
  noop,
  bank,
  bik,
  bankAccount,
  personalAccount,
  kbk,
];

export const refundNaturalFields = createRefundFields(naturalFields);
export const refundJuridicalFields = createRefundFields(juridicalFields);
export const refundFiscalOrganizationFields = createRefundFields(
  fiscalOrganizationFields,
);
