import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Footer для ЖС
 *
 * @example
 * <LifeSituationFooter />
 *
 * @returns {React$Node} Компонент Footer для ЖС
 */
export const LifeSituationFooter = ({ children }) => (
  <L.Div className="toolbar fixed flex-row align-items-center padding-x-32">
    <L.Div className="margin-left-auto">{children}</L.Div>
  </L.Div>
);
