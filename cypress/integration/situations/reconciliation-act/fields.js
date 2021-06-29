import { FIXTURE_FILES, ERROR_MESSAGES } from '@support/common/constants';

import { APPEAL_DETAILS } from '@support/modules/appeals';

import {
  InputField,
  DropdownSelectField,
  DateField,
  DateRangeField,
  FileField,
} from '@support/modules/fields';

import {
  compareTextField,
  compareDatePeriodField,
  compareFileField,
} from '@support/test-cases/appeals';

import {
  typeContractAndReconciliationActDatePeriodAction,
  produceAppealTitleAction,
} from './actions';

export const appealType = new DropdownSelectField({ name: 'appealType' });

export const contractNumber = {
  field: new InputField({
    name: 'contractNumber',
    label: 'Номер договора',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
};

export const contractDate = {
  field: new DateField({
    name: 'contractDate',
    label: 'Дата договора',
    isRequired: true,
  }),
};

export const actPeriod = {
  field: new DateRangeField({
    name: 'datePeriod',
    label: 'Период формирования акта сверки',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
};

export const file = {
  field: new FileField({
    name: 'file',
    label: 'Документ',
    description:
      'Загрузите скан-копию бумажного акта-сверки с печатью и подписью уполномоченного лица',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.FILE_REQUIRED,
};

export const requestActActions = [
  typeContractAndReconciliationActDatePeriodAction,

  produceAppealTitleAction(APPEAL_DETAILS.REQUEST_ACT.title),
];

export const requestActChecks = [
  compareTextField({
    label: 'Договор',
    value: '@contractNumber',
  }),

  compareTextField({
    label: contractDate.field.label,
    value: '@contractDate',
  }),

  compareDatePeriodField({
    label: actPeriod.field.label,
    value: '@reconciliationActDatePeriod',
  }),
];

export const scannedActActions = [
  typeContractAndReconciliationActDatePeriodAction,

  produceAppealTitleAction(APPEAL_DETAILS.SCANNED_ACT.title),

  () => file.field.setValue(FIXTURE_FILES.LITTLE_PNG).shouldBeSuccess(),
];

export const scannedActChecks = [
  ...requestActChecks,
  compareFileField({
    label: file.field.label,
    value: FIXTURE_FILES.LITTLE_PNG,
  }),
];
