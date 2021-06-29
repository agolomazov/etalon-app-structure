import React from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { selectors } from '../selectors';

export const GlobalLoader = ({ children }) => {
  const isLoading = useSelector(selectors.isLoading);
  const isGlobal = useSelector(selectors.isGlobal);

  return (
    <L.Loader isLoading={isLoading} isGlobal={isGlobal}>
      {children}
    </L.Loader>
  );
};
