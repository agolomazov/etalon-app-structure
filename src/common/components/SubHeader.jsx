import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Отображение заголовка для страницы
 * @example
 * <SubHeader />
 *
 * @returns {React.FC} заголовок страницы
 */
export const SubHeader = ({ children }) => (
  <L.Div className="page-title">
    <L.Div className="flex-row align-items-center">{children}</L.Div>
  </L.Div>
);
