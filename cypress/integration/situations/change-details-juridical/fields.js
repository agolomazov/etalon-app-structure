import { FIXTURE_FILES, ERROR_MESSAGES } from '@support/common/constants';
import {
  InputField,
  DropdownSelectField,
  FileMultipleField,
} from '@support/modules/fields';

import {
  compareFileListField,
  compareTextField,
} from '@support/test-cases/appeals';

/** Тип обращения */
export const appealType = {
  field: new DropdownSelectField({
    name: 'appealType',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
};

/** Подтверждающий документ */
export const fileList = {
  field: new FileMultipleField({
    name: 'file',
    label: 'Подтверждающий документ',
    description:
      'Загрузите скан-копии документов, подтверждающих изменение данных',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.FILE_REQUIRED,
  action() {
    return () => {
      this.field
        .appendFile(FIXTURE_FILES.ONE_PNG)
        .waitStopLoading()
        .appendFile(FIXTURE_FILES.TWO_PNG)
        .waitStopLoading()
        .appendFile(FIXTURE_FILES.THREE_PNG)
        .waitStopLoading()
        .appendFile(FIXTURE_FILES.FOUR_PNG)
        .waitStopLoading()
        .appendFile(FIXTURE_FILES.FIVE_PNG)
        .waitStopLoading();
    };
  },
  check() {
    return compareFileListField({
      label: this.field.label,
      files: [
        FIXTURE_FILES.ONE_PNG,
        FIXTURE_FILES.TWO_PNG,
        FIXTURE_FILES.THREE_PNG,
        FIXTURE_FILES.FOUR_PNG,
        FIXTURE_FILES.FIVE_PNG,
      ],
    });
  },
};

/** Телефон */
export const tel = {
  field: new InputField({
    name: 'tel',
    label: 'Телефон',
    isRequired: true,
  }),
  type: '0000000101',
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

/** Email */
export const email = {
  field: new InputField({
    name: 'email',
    label: 'Почта',
    isRequired: true,
  }),
  type: 'tenant@mail.ru',
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

/** Фамилия */
export const surname = {
  field: new InputField({
    name: 'surname',
    label: 'Фамилия Имя Отчество',
    description: 'Нового руководителя',
    isRequired: true,
  }),
  type: 'Иванов',
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  action() {
    return () => this.field.setValue(this.type);
  },
};

/** Имя */
export const name = {
  field: new InputField({
    name: 'name',
    isRequired: true,
  }),
  type: 'Иван',
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  action() {
    return () => this.field.setValue(this.type);
  },
};

/** Отчество */
export const patronymic = {
  field: new InputField({
    name: 'patronymic',
  }),
  type: 'Иванович',
  messageLabel: 'ФИО нового руководителя',
  action() {
    return () => this.field.setValue(this.type);
  },
  check() {
    return compareTextField({
      label: this.messageLabel,
      value: `${name.type} ${this.type} ${surname.type.charAt(0)}.`,
    });
  },
};

/** Комментарий */
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

export const changeJuridicalAddressFields = [fileList, comment];

export const changeOrganizationalLegalFormFields = [fileList, comment];

export const changeCompanyNameFields = [fileList, comment];

export const changeContactDetailsFields = [tel, email, comment];

export const changeDirectorFields = [
  surname,
  name,
  patronymic,
  fileList,
  comment,
];
