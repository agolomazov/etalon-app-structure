import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Тег активного фильтра по типу объекта аренды
 *
 * @example
 * <RentalTypeTag value="Земельный участок" onClick={onClick}/>
 *
 * @param {Object} props - Параметры компонента
 * @param {String} props.value - тип объекта аренды
 * @param {Function} props.onClick - обработчик клика
 *
 * @returns {React.FC} Тег активного фильтра по типу объекта аренды
 */
export const RentalTypeTag = ({ value, onClick }) => (
  <L.Tag
    className="pointer"
    shouldRender={!!value}
    onClick={onClick}
    wrapperRender={({ Element, elementProps }) => (
      <Element {...elementProps}>
        {value ? `Тип договора аренды: ${value}` : null}
        <L.I className="tags-icon icon-default" />
      </Element>
    )}
  />
);
