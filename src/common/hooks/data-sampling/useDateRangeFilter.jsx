import React, { useMemo, useRef } from 'react';
import * as L from 'korus-ui';

import { useValue } from './useValue';

/**
 * @typedef {object} DateRangeHook
 * @property {string} name - имя
 * @property {Array<[string, string]> | Array<[Date, Date]>} value - значение
 * @property {function} submit - установить значение фильтра
 * @property {function} reset - сбросить на начальное значение
 * @property {React.FC} Component - Компонент
 */
/**
 * Хук для фильтрации в диапазоне дат
 *
 * @param {object} params - Параметры хука
 * @param {string} params.name - имя
 * @param {Array<[string, string]> | Array<[Date, Date]>} params.initialValue - начальное значение
 * @param {"auto" | "manual"} params.submitMode - режим установки (автоматический или ручной)
 *
 * @returns {DateRangeHook} результат
 */
export const useDateRangeFilter = ({
  name,
  initialValue = ['', ''],
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
    initialValue: initialValueRef.current,
    submitMode,
  });

  const Component = useMemo(
    () => (props) => (
      <L.DateRange
        placeholder={['дд.мм.гггг', 'дд.мм.гггг']}
        onChange={onChangeRef.current}
        value={localValueRef.current}
        name={nameRef.current}
        {...props}
      />
    ),
    [],
  );

  return {
    name,
    value: useMemo(() => resultValueRef.current, [
      resultValueRef.current?.[0],
      resultValueRef.current?.[1],
    ]),
    submit,
    reset,
    Component,
  };
};
