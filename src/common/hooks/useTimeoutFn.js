import { useCallback, useEffect, useRef } from 'react';

/**
 * Хук, вызывает заданную функцию через указанное количество миллисекунд.
 * - не перерисовывает компонент;
 * - автоматически сбрасывать таймаут при изменении задержки;
 * - вызов функции сброса отменит предыдущий тайм-аут;
 * - таймаут не будет сброшен при изменении функции.
 *
 * @example
 * const [
 *   isReady: () => boolean | null,
 *   cancel: () => void,
 *   reset: () => void,
 * ] = useTimeoutFn(fn: Function, ms: number = 0);
 *
 * @param {function} fn - функция
 * @param {number} ms - задержка в мс
 *
 * @returns {Array} результат
 */
export const useTimeoutFn = (fn, ms = 0) => {
  const ready = useRef(false);
  const timeout = useRef();
  const callback = useRef(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    ready.current = null;
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  useEffect(() => {
    set();

    return clear;
  }, [ms]);

  return [isReady, clear, set];
};
