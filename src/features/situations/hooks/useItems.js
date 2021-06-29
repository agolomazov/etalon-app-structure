import { useState, useCallback } from 'react';
/**
 * Хук создает пропсы для компонентов AutoComplete, DropDownSelect
 *
 * @example
 * const { value, onChange } = useItems({ onChange: ({name, value})=> dispatch(actions.change({name, value}))})
 *
 * @param {object} params - Параметры хука
 * @param {Array} params.items - список данных для отображения
 * @param {Function} params.onChange - Обработчик события изменения значения
 *
 * @returns {object} Объект { value, onChange, data, textField }
 */
export const useItems = ({ items, onChange }) => {
  const [value, setValue] = useState(null);

  const onChangeValue = useCallback(
    (ev) => {
      const { name, value: itemValue } = ev.component;
      setValue(itemValue);
      if (onChange) {
        onChange({
          name,
          value: itemValue.type,
        });
      }
    },
    [onChange],
  );

  return {
    value,
    onChange: onChangeValue,
    data: items,
    textField: 'displayText',
  };
};
