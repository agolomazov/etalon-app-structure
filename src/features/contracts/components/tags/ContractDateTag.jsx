import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Тег активного фильтра по дате договора
 *
 * @example
 * <ContractDateTag value={value} onClick={onClick}/>
 *
 * @param {Object} props - Параметры компонента
 * @param {Array} props.value - границы дат действия договора
 * @param {Function} props.onClick - обработчик клика
 *
 * @returns {React.FC} Тег активного фильтра по дате договора
 */
export const ContractDateTag = ({ value, onClick }) => (
  <L.Tag
    shouldRender={value[0] !== '' || value[1] !== ''}
    onClick={onClick}
    className="pointer"
    wrapperRender={({ Element, elementProps }) => (
      <Element {...elementProps}>
        {'Дата договора: '}
        {value[0] !== '' ? `с ${value[0]} ` : null}
        {value[1] !== '' ? `по ${value[1]}` : null}
        <L.I className="tags-icon icon-default" />
      </Element>
    )}
  />
);
