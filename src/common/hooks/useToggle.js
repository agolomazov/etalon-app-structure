import { useReducer } from 'react';

const toggleReducer = (state, nextValue) =>
  typeof nextValue === 'boolean' ? nextValue : !state;

/**
 * Хук булиновского состояния
 *
 * @param {boolean} initialValue - начальное значение
 *
 * @returns {[React.ReducerStateWithoutAction<boolean>, React.DispatchWithoutAction]} результат
 */
export const useToggle = (initialValue) =>
  useReducer(toggleReducer, initialValue);
