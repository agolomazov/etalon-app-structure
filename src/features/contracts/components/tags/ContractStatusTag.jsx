import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Тег активного фильтра по статусу договора аренды
 *
 * @example
 * <ContractStatusTag value={value} onClick={onClick}/>
 *
 * @param {Object} props - Параметры компонента
 * @param {String} props.value - статус договора
 * @param {Function} props.onClick - обработчик клика
 *
 * @returns {React.FC} Тег активного фильтра по статусу договора аренды
 */
export const ContractStatusTag = ({ value, onClick }) => (
  <L.Tag
    className="pointer"
    shouldRender={!!value}
    onClick={onClick}
    wrapperRender={({ Element, elementProps }) => (
      <Element {...elementProps}>
        <L.Span>{`${value} договор`}</L.Span>
        <L.Span className="tags-icon icon-default" />
      </Element>
    )}
  />
);
