import { ERROR_MESSAGES, FIXTURE_FILES } from '@support/common/constants';

import {
  DateField,
  DropdownSelectField,
  InputField,
  FileField,
  MultiSelectField,
} from '@support/modules/fields';

import {
  noopAction,
  compareTextField,
  compareFileField,
} from '@support/test-cases/appeals';

import {
  typeContractNumberAndDateAction,
  typeAddressAndTypeAction,
} from './actions';

import { contractLinkCheck } from './checks';

export const appealType = new DropdownSelectField({
  label: 'Выберите действие',
  name: 'appealType',
});

/**
 * Номер договора
 */
export const contractNumber = {
  field: new InputField({
    name: 'documentNumber',
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
  field: new DateField({
    name: 'documentDate',
    label: 'Дата договора',
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
 * Комментарий
 */
export const comment = {
  field: new InputField({
    name: 'changeCommentValue',
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
 * Адрес объекта
 */
export const objectAdress = {
  field: new InputField({
    label: 'Адрес объекта',
    name: 'objectAdress',
    isRequired: true,
  }),
  messageLabel: 'Текущий адрес объекта',
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  action() {
    return noopAction;
  },
  check() {
    return compareTextField({
      label: this.messageLabel,
      value: '@facilityAddress',
    });
  },
};

/**
 * Тип объекта
 */
export const objectType = {
  field: new DropdownSelectField({
    label: 'Тип объекта',
    name: 'objectType',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  action() {
    return typeAddressAndTypeAction;
  },
  check() {
    return compareTextField({
      label: this.field.label,
      value: '@facilityType',
    });
  },
};

/**
 * Кадастровый номер объекта
 */
export const cadastralNumber = {
  field: new InputField({
    label: 'Кадастровый номер',
    name: 'cadastralNumber',
  }),
  action() {
    return () => noopAction;
  },
  check() {
    return compareTextField({
      label: this.field.label,
      value: '@facilityCadastralNumber',
    });
  },
};

/**
 * Выбор какие характеристики нужно поменять
 */
export const changesSelect = {
  field: new MultiSelectField({
    label: 'Характеристики объекта',
    name: 'changesSelect',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  action() {
    return () => noopAction;
  },
  check() {
    return () => noopAction;
  },
};

/**
 * Подтверждающие документы
 */
export const file = {
  field: new FileField({
    name: 'file',
    label: 'Документ',
    description:
      'Загрузите скан-копии документов, подтверждающих изменение данных',
    isRequired: true,
  }),
  messageLabel: 'Подтверждающий документ',
  requiredMessage: ERROR_MESSAGES.FILE_REQUIRED,
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
 * Новый адрес объекта
 */
export const changeAdressValue = {
  field: new InputField({
    label: 'Новый адрес объекта',
    name: 'changeAdressValue',
    isRequired: true,
  }),
  type: 'Новый адрес',
  messageLabel: 'Новое значение адреса',
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
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
 * Новый кадастровый номер
 */
export const changeCadastralValue = {
  field: new InputField({
    label: 'Новый кадастровый номер',
    name: 'changeCadastralValue',
    isRequired: true,
  }),
  type: '29:16:240401:1072',
  messageLabel: 'Новое значение кадастрового номера',
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
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
 * Новый значение площади
 */
export const changeAreaValue = {
  field: new InputField({
    label: 'Площадь',
    name: 'changeAreaValue',
  }),
  type: 500,
  messageLabel: 'Новое значение площади',
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
 * Новое назначение объекта
 */
export const changeObjectIntendValue = {
  field: new InputField({
    label: 'Назначение объекта',
    name: 'changeObjectIntendValue',
    isRequired: true,
  }),
  type: 'назначение',
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
 * Новый вид разрешенного использования
 */
export const changePermisionType = {
  field: new InputField({
    label: 'Вид разрешенного использования',
    name: 'changePermisionType',
    isRequired: true,
  }),
  type: 'разрешенное использование',
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
 * Новая категория
 */
export const changeCategoryValue = {
  field: new DropdownSelectField({
    label: 'Категория',
    name: 'changeCategoryValue',
    isRequired: true,
  }),
  requiredMessage: ERROR_MESSAGES.INPUT_REQUIRED,
  action() {
    return () => this.field.setValueByIndex(0).getValue().as('objectCategory');
  },
  check() {
    return compareTextField({
      label: this.field.label,
      value: '@objectCategory',
    });
  },
};

/**
 * Неуказанный адресс
 */
export const missingAddress = {
  field: new InputField({
    label: 'Количество объектов с неуказанным адресом',
    name: 'missingAddress',
  }),
  action() {
    return () => noopAction;
  },
  check() {
    return compareTextField({
      label: this.field.label,
      value: '@missingAddress',
    });
  },
};

/**
 * Неуказанная площадь
 */
export const missingArea = {
  field: new InputField({
    label: 'Количество объектов с неуказанной площадью',
    name: 'missingArea',
  }),
  action() {
    return () => noopAction;
  },
  check() {
    return compareTextField({
      label: this.field.label,
      value: '@missingArea',
    });
  },
};

/**
 * Неуказанная кадастровый номер
 */
export const missingCadastral = {
  field: new InputField({
    label: 'Количество объектов с неуказанным кадастровым номером',
    name: 'missingCadastral',
  }),
  action() {
    return () => noopAction;
  },
  check() {
    return compareTextField({
      label: this.field.label,
      value: '@missingCadastralNumber',
    });
  },
};

/**
 * Поля, которые можно менять у любого типа объекта, кроме "Земельного участка"
 */
export const anyObjectTypeFields = [
  changeAdressValue,
  changeAreaValue,
  changeCadastralValue,
  changeObjectIntendValue,
];

/**
 * Поля, которые можно менять у "Земельного участка"
 */
export const landPlotFields = [
  changeAdressValue,
  changeAreaValue,
  changeCadastralValue,
  changePermisionType,
  changeCategoryValue,
];

/**
 * Поля, для обращения "Сообщить об отсутствии данных по объектам"
 */
export const missedFields = [
  contractNumber,
  contractDate,
  missingAddress,
  missingArea,
  missingCadastral,
  comment,
];

/**
 * Формирует список полей для проверки
 *
 * @param {Array} additionalFields - дополнительные поля
 * @param {Boolean} shouldHaveCadastral - должен ли быть кадастровый номер
 *
 * @returns {Array} массив полей для проверки
 */
export const setFields = (additionalFields, shouldHaveCadastral = false) =>
  [
    contractNumber,
    contractDate,
    objectAdress,
    shouldHaveCadastral ? cadastralNumber : undefined,
    objectType,
    ...additionalFields,
    file,
    comment,
  ].filter((field) => !!field);
