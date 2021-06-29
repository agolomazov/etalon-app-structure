import { useEffect } from 'react';
import { useTimeoutFn } from './useTimeoutFn';

/**
 * Хук, который откладывает вызов функции до тех пор, пока не истечет время ожидания с момента последнего вызова функции
 *
 * @param {function} fn - функция
 * @param {number} ms - задержка в мс
 * @param {React.DependencyList} deps - список зависимостей
 *
 * @returns {Array} результат
 */
export const useDebounce = (fn, ms = 0, deps = []) => {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

  useEffect(reset, deps);

  return [isReady, cancel];
};
