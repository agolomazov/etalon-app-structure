import React from 'react';
import { useSelector } from 'react-redux';

import { selectors } from '../selectors';

/**
 * ## Обертка для компонентов которые зависят permission
 *
 * @example
 * <PermissionGuard permission="permission"/>
 *
 * @param {object} props - Параметры компонента
 * @param {string} props.permission - permission компонента
 * @param {boolean} props.shouldRenderIfNoPermission - нужно ли отрисовывать если permission отсутствует
 *
 * @returns {React.FC} обернутый компонент или null
 */
export const PermissionGuard = ({
  children,
  permission,
  shouldRenderIfNoPermission = false,
}) => {
  const userPermissions = useSelector(selectors.userPermissions);
  if (userPermissions.includes(permission)) {
    return shouldRenderIfNoPermission ? null : <>{children}</>;
  }
  return shouldRenderIfNoPermission ? <>{children}</> : null;
};
