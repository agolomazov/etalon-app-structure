import React from 'react';
import { useSelector } from 'react-redux';

import { selectors } from '../selectors';

/**
 * ## Заголовок страници оплаты через ЕПС
 *
 * @example
 * <UpsPageTitle />
 *
 * @returns {React.FC} Заголовок страници оплаты через ЕПС
 */
export const UpsPageTitle = () => {
  const pageTitle = useSelector(selectors.pageTitle);
  return <>{pageTitle}</>;
};
