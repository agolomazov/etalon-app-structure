import { useCallback, useRef } from 'react';

import { useRerender } from '../useRerender';
import { useDebounce } from '../useDebounce';

/**
 * @typedef {object} ValueHook
 * @property {React.MutableRefObject} localValueRef - реф, с локальным значением
 * @property {React.MutableRefObject } resultValueRef - реф, с результирующим значением
 * @property {React.MutableRefObject } onChangeRef - реф, с функцией onChange
 * @property {function} submit - установить значение
 * @property {function} reset - сбросить на начальное значение
 */
/**
 * Хук для взаимодействия со значением фильтрации/сортировки
 *
 * @param {object} params - Параметры хука
 * @param {any} params.initialValue - начальное значение
 * @param {number} params.debounceMs - задержка для debounce в мс, если 0 - то отключить debounce
 * @param {"auto" | "manual"} params.submitMode - режим установки (автоматический или ручной)
 *
 * @returns {ValueHook} результат
 */
export const useValue = ({ initialValue, submitMode, debounceMs = 0 }) => {
  const rerender = useRerender();

  const localValueRef = useRef(initialValue);
  const resultValueRef = useRef(initialValue);
  const onChangeRef = useRef();

  const submit = useCallback(() => {
    resultValueRef.current = localValueRef.current;
    rerender();
  }, []);

  const reset = useCallback(() => {
    localValueRef.current = initialValue;
    resultValueRef.current = initialValue;
    rerender();
  }, [initialValue]);

  onChangeRef.current = useCallback(
    (e) => {
      localValueRef.current = e.component.value;
      if (submitMode === 'auto' && debounceMs === 0) {
        resultValueRef.current = localValueRef.current;
      }
      rerender();
    },
    [submitMode, debounceMs],
  );

  useDebounce(
    () => {
      if (debounceMs > 0) {
        resultValueRef.current = localValueRef.current;
        rerender();
      }
    },
    debounceMs,
    [localValueRef.current],
  );

  return {
    localValueRef,
    resultValueRef,
    onChangeRef,
    submit,
    reset,
  };
};
