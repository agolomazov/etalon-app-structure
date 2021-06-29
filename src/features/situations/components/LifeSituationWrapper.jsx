import React from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { selectors } from '../selectors';

/**
 * ## Wrapper layout для ЖС
 *
 * @example
 * <LifeSituationWrapper />
 *
 * @returns {React$Node} Компонент Wrapper layout для ЖС
 */
export const LifeSituationWrapper = ({ children }) => {
  const isLoading = useSelector(selectors.isLoading);

  return (
    <L.Loader
      className="page-content padding-x-32 padding-y-16
                 border-top no-background"
      isLoading={isLoading}
    >
      {children}
    </L.Loader>
  );
};
