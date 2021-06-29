import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Тег активного фильтра по сроку действия договора
 *
 * @example
 * <ActiveDatePeriodTag value={value} onClick={onClick}/>
 *
 * @param {Object} props - Параметры компонента
 * @param {Array} props.value - период действия договора
 * @param {Function} props.onClick - обработчик клика
 *
 * @returns {React.FC} Тег активного фильтра по сроку действия договора
 */
export const ActiveDatePeriodTag = ({ value, onClick }) => (
  <L.Tag
    shouldRender={value[0] !== '' || value[1] !== ''}
    onClick={onClick}
    className="pointer"
    wrapperRender={({ Element, elementProps }) => (
      <Element {...elementProps}>
        {'Срок действия договора: '}
        {value[0] !== '' ? `с ${value[0]} ` : null}
        {value[1] !== '' ? `по ${value[1]}` : null}
        <L.I className="tags-icon icon-default" />
      </Element>
    )}
  />
);
