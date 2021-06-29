import { useState, useCallback } from 'react';

/**
 * Хук возвращает функцию, которая заставляет компонент повторно отрисовываться при вызове.
 *
 * @returns {function} функция повторной перерисовки
 */
export const useRerender = () => {
  const [, setState] = useState();
  return useCallback(() => setState({}), []);
};
