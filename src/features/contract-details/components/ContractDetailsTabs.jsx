import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Вкладки c детальной информацией по договору
 *
 * @example
 *
 * <ContractDetailsTabs activeTabKey={activeTabKey} onChange={onChange}/>
 *
 * @param {object} props - параметры компонента
 * @param {object} props.activeTabKey - идентификатор выбранной вкладки
 * @param {object} props.onChange - обработчик выбора вкладки
 *
 * @returns {React.FC} Вкладки c детальной информацией по договору
 */
export const ContractDetailsTabs = ({ activeTabKey, onChange, children }) => (
  <L.Div className="page-wrapper">
    <L.Tabs
      activeTabKey={activeTabKey}
      className="tabs-wrapper-nav padding-top-32 margin-top-24"
      onChange={onChange}
    >
      {children}
    </L.Tabs>
  </L.Div>
);
