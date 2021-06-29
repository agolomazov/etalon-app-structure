import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Тег активного фильтра по типу договора аренды
 *
 * @example
 * <ContractTypeTag value={value} onClick={onClick}/>
 *
 * @param {Object} props - Параметры компонента
 * @param {String} props.value - тип договора
 * @param {Function} props.onClick - обработчик клика
 *
 * @returns {React.FC} Тег активного фильтра по типу договора аренды
 */
export const ContractTypeTag = ({ value, onClick }) => (
  <L.Tag
    className="pointer"
    shouldRender={!!value}
    onClick={onClick}
    wrapperRender={({ Element, elementProps }) => (
      <Element {...elementProps}>
        {`Тип договора аренды: ${value}`}
        <L.I className="tags-icon icon-default" />
      </Element>
    )}
  />
);
