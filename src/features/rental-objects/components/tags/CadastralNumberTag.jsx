import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Тег активного фильтра по кадастровому номеру
 *
 * @example
 * <CadastralNumberTag value="47:14:1203001:814" onClick={onClick}/>
 *
 * @param {Object} props - Параметры компонента
 * @param {String} props.value - кадастровый номер
 * @param {Function} props.onClick - обработчик клика
 *
 * @returns {React.FC} Тег активного фильтра по кадастровому номеру
 */
export const CadastralNumberTag = ({ value, onClick }) => (
  <L.Tag
    shouldRender={!!value}
    onClick={onClick}
    className="pointer"
    wrapperRender={({ Element, elementProps }) => (
      <Element {...elementProps}>
        {`Кадастровый номер содержит: ${value}`}
        <L.I className="tags-icon icon-default" />
      </Element>
    )}
  />
);
