import React, { useMemo, useRef } from 'react';
import * as L from 'korus-ui';

import { useValue } from './useValue';

/**
 * @typedef {object} SelectFilterHook
 * @property {string} name - имя
 * @property {string | null} value - значение
 * @property {string} text - текст для отображения
 * @property {function} submit - установить значение фильтра (вызывается автоматически в режиме "auto")
 * @property {function} reset - сбросить на начальное значение
 * @property {React.FC} Component - Компонент
 */
/**
 * Хук для фильтрации по заданным значениям
 *
 * @param {object} params - Параметры хука
 * @param {string} params.name - имя
 * @param {Array<object>} params.data - Данные для отображения
 * @param {string} params.textField - имя поля в объектах data, которое содержит текст для отображения
 * @param {string} params.valueField - имя поля в объектах data, которое содержит значение фильтра
 * @param {string | null} params.initialValue - начальное значение
 * @param {"auto" | "manual"} params.submitMode - режим установки (автоматический или ручной)
 *
 * @returns {SelectFilterHook} результат
 */
export const useSelectFilter = ({
  name,
  data,
  textField = 'name',
  valueField = 'code',
  initialValue = null,
  submitMode = 'auto',
}) => {
  const nameRef = useRef(name);
  const initialValueRef = useRef(initialValue);

  const {
    localValueRef,
    resultValueRef,
    onChangeRef,
    submit,
    reset,
  } = useValue({
    initialValue: useMemo(
      () =>
        data.find((el) => el[valueField] === initialValueRef.current) || null,
      [data, valueField],
    ),
    submitMode,
  });

  const Component = useMemo(
    () => (props) => (
      <L.DropDownSelect
        data={data}
        textField={textField}
        onChange={onChangeRef.current}
        value={localValueRef.current}
        name={nameRef.current}
        {...props}
      />
    ),
    [data, textField],
  );

  return {
    name,
    value: resultValueRef.current?.[valueField],
    text: resultValueRef.current?.[textField],
    submit,
    reset,
    Component,
  };
};
