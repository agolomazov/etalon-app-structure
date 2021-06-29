import React from 'react';
import * as L from 'korus-ui';

import { LabeledField } from '@common/components';

/**
 * ## Компонент реквизит услуги
 *
 * @example
 * <UpsField />
 *
 * @param {Object} props - Параметры компонента
 * @param {string} props.form - Имя формы
 * @param {string} props.type - Тип вводимых данных
 * @param {string} props.name - Короткое имя – код реквизита
 * @param {string} props.fullname - Полное наименование для отображения пользователю
 * @param {string} props.comment - Дополнительное описание, расшифровка
 * @param {number|string} props.minLength - Минимально возможная длина вводимого значения
 * @param {number|string} props.maxLength - Максимально возможная длина вводимого значения
 * @param {boolean} props.isRequired - Обязателен для ввода
 * @param {boolean} props.isVisible - Отображать ли пользователю
 * @param {boolean} props.isEditable - Разрешено ли изменение введённого ранее значения
 * @param {string} props.value - Введённое значение реквизита
 * @param {string} props.regExp - Регулярное выражения проверки введённого значения
 * @param {Array<string>} props.options - Список предопределенных значений для подстановки в реквизит
 * @param {Function} props.onChange - Обработчик изменения реквизита
 *
 * @returns {React.FC} Компонент реквизит услуги
 */
export const UpsField = React.memo(function UpsField({
  form,
  type,
  name,
  fullname,
  comment,
  minLength,
  maxLength,
  isRequired,
  isVisible,
  isEditable,
  value,
  regExp,
  options,
  onChange,
}) {
  const basicProps = {
    form,
    name,
    value,
    isRequired,
    isDisabled: !isEditable,
  };

  const inputProps = {
    ...basicProps,
    maxLength,
    validator: [
      {
        validator: new RegExp(regExp),
        invalidMessage: '',
      },
      {
        validator: (v) => v.trim().length < minLength,
        invalidMessage: '',
      },
    ],
  };

  const dropdownProps = {
    ...basicProps,
    data: options,
  };

  const FieldComponent = type === 'M' ? L.DropDownSelect : L.Input;
  const props = type === 'M' ? dropdownProps : inputProps;

  return (
    <LabeledField
      label={fullname}
      tooltip={comment}
      shouldRender={isVisible}
      classNameDescription="txt-gray"
    >
      <FieldComponent
        className="width-50"
        onChange={(e) => onChange({ name, value: e.component.value })}
        {...props}
      />
    </LabeledField>
  );
});
