import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Основной layout для ЖС
 *
 * @example
 * <LifeSituationMain />
 *
 * @returns {React$Node} Компонент основной layout для ЖС
 */
export const LifeSituationMain = ({ children }) => (
  <L.Div className="page-wrapper">
    <L.Div className="margin-bottom-32 padding-y-8">{children}</L.Div>
  </L.Div>
);
