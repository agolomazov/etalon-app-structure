import React, { useMemo, useRef } from 'react';
import * as L from 'korus-ui';

import { useValue } from './useValue';

/**
 * @typedef {object} SearchFilterHook
 * @property {string} name - имя
 * @property {string } value - значение
 * @property {function} submit - установить значение фильтра, только для ручного режима
 * @property {function} reset - сбросить на начальное значение
 * @property {React.FC} Component - Компонент
 */
/**
 * Хук для фильтрации по введенному значению
 *
 * @param {object} params - Параметры хука
 * @param {string} params.name - имя
 * @param {string | null} params.initialValue - начальное значение
 * @param {number} params.debounceMs - задержка для debounce в мс, если 0 - то отключить debounce
 * @param {"auto" | "manual"} params.submitMode - режим установки (автоматический или ручной)
 *
 * @returns {SearchFilterHook} результат
 */
export const useSearchFilter = ({
  name,
  initialValue = '',
  debounceMs = 0,
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
    debounceMs,
  });

  const Component = useMemo(
    () => (props) => (
      <L.Input
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
    value: resultValueRef.current,
    submit,
    reset,
    Component,
  };
};
