import { FIXTURE_FILES, ERROR_MESSAGES } from '@support/common/constants';
import { getToday } from '@support/common/utils';
import {
  DropdownSelectField,
  FileField,
  DownloadField,
} from '@support/modules/fields';

import { compareFileField } from '@support/test-cases/appeals';

export const appealType = new DropdownSelectField({
  label: 'Тип',
  name: 'appealType',
});

export const downloadRejectApeal = {
  field: new DownloadField({
    label: 'Заявление',
    name: 'download',
    fileName: `Заявление на отказ от получения документов на бумажном носителе_${getToday()}.pdf`,
    fieldDescription:
      'Распечатайте заявление на бланке организации (при его наличии), поставьте подпись и печать (при наличии печати). В случае необходимости приложите скан-образ доверенности для подтверждения полномочий на подписание.',
  }),
};

export const downloadConsentApeal = {
  field: new DownloadField({
    label: 'Заявление',
    name: 'download',
    fileName: `Заявление на получение документов на бумажном носителе_${getToday()}.pdf`,
    fieldDescription:
      'Распечатайте заявление на бланке организации (при его наличии), поставьте подпись и печать (при наличии печати). В случае необходимости приложите скан-образ доверенности для подтверждения полномочий на подписание.',
  }),
};

export const appealFile = {
  field: new FileField({
    name: 'appealFile',
    label: 'Загрузите скан-образ подписанного заявления',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.FILE_REQUIRED,
  messagesLabel: 'Cкан-образ подписанного заявления',
  action() {
    return () =>
      this.field.setValue(FIXTURE_FILES.LITTLE_PNG).shouldBeSuccess();
  },
  check() {
    return compareFileField({
      label: this.messagesLabel,
      value: FIXTURE_FILES.LITTLE_PNG,
    });
  },
};

export const powerOfAttorneyFile = {
  field: new FileField({
    name: 'powerOfAttorneyFile',
    label: 'Загрузите скан-образ доверенности',
  }),
  messagesLabel: 'Cкан-образ доверенности',
  action() {
    return () =>
      this.field.setValue(FIXTURE_FILES.LITTLE_PNG).shouldBeSuccess();
  },
  check() {
    return compareFileField({
      label: this.messagesLabel,
      value: FIXTURE_FILES.LITTLE_PNG,
    });
  },
};

export const fileFields = [appealFile, powerOfAttorneyFile];
export const consentFields = [
  appealFile,
  powerOfAttorneyFile,
  downloadConsentApeal,
];
export const rejectFields = [
  appealFile,
  powerOfAttorneyFile,
  downloadRejectApeal,
];
