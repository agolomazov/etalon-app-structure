import React from 'react';

import { UpsField } from './UpsField';

/**
 * ## Компонент список реквизитов услуги
 *
 * @example
 * <UpsFieldList />
 *
 * @param {Object} props - Параметры компонента
 * @param {string} props.form - Имя формы
 * @param {Array} props.fields - массив реквизитов
 * @param {Function} props.onChange - Обработчик изменения реквизита
 *
 * @returns {React.FC} Компонент список реквизитов услуги
 */
export const UpsFieldList = ({ form, fields = [], onChange }) => (
  <>
    {fields.map(
      ({
        type,
        name,
        fullname,
        comment,
        min_length: minLength,
        max_length: maxLength,
        isRequired,
        isVisible,
        isEditable,
        value,
        reg_exp: regExp,
        options,
      }) => (
        <UpsField
          key={name}
          form={form}
          type={type}
          name={name}
          fullname={fullname}
          comment={comment}
          minLength={minLength}
          maxLength={maxLength}
          isRequired={isRequired}
          isVisible={isVisible}
          isEditable={isEditable}
          value={value}
          regExp={regExp}
          options={options}
          onChange={onChange}
        />
      ),
    )}
  </>
);
