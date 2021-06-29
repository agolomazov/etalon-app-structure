import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

/**
 * Фабричный метод. Создает хук `useActions`
 *
 * @param {object} actions - объект с экшанами
 *
 * @example
 *
 * // actions.js
 * export const doSomething = e => ({
 *   type: 'sometype',
 *   payload: e.target.value,
 * })
 *
 * export const useActions = createUseActionsHook({ doSomething })
 *
 * // component.js
 * import React from 'react'
 * import { useActions } from './actions'
 *
 * export const MyComponent = ({ id, text }) => {
 *   const {doSomething} = useActions()
 *   return (
 *     <button value={id} onClick={doSomething}>
 *       {text}
 *     </button>
 *   )
 * }
 *
 * @returns {function} Хук `useActions`
 */
export const createUseActionsHook = (actions) =>
  function useActions(deps) {
    const dispatch = useDispatch();
    return useMemo(
      () => {
        if (Array.isArray(actions)) {
          return actions.map((action) => bindActionCreators(action, dispatch));
        }
        return bindActionCreators(actions, dispatch);
      },
      deps ? [dispatch, ...deps] : [dispatch],
    );
  };

/**
 * Хук привязывает dispatch к экшенам
 *
 * @param {object} actions - объект с экшанами
 * @param {Array} deps - массив зависимостей, опционально
 *
 * @returns {object} объект с экшанами обернутыми в dispatch
 */
export const useActions = (actions, deps) =>
  createUseActionsHook(actions)(deps);
