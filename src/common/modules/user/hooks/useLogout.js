import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { actions } from '../ducks';

/**
 * Хук для выхода пользователя из ЛК
 *
 * @example
 * const logout = useLogout()
 *
 * @returns {function} функция выхода пользователя из ЛК
 */
export const useLogout = () => {
  const dispath = useDispatch();
  const logout = useCallback(() => {
    dispath(actions.logoutUserFlow());
  }, []);

  return logout;
};
