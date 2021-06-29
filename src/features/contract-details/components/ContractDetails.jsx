import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Компонент "Детали по договору"
 *
 * @example
 *
 * <ContractDetails>
 *    <ContractDetailsCard contractData={contractData} />
 * </ContractDetails>
 *
 * @param {object} props - параметры компонента
 * @param {object} props.shouldRender - должен ли рендериться компонент
 *
 * @returns {React.FC} Компонент "Детали по договору"
 */
export const ContractDetails = ({ children, shouldRender = true }) => {
  if (!shouldRender) {
    return null;
  }

  return <L.Div className="page-wrapper">{children}</L.Div>;
};
