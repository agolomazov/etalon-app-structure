import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

/**
 * ## Компонент элемент списка жизненных ситуаций
 *
 * @example
 * <SituationsGridItem
 * title='В личном кабинете нет информации о моем договоре аренды'
 * to ='#'/>
 *
 * @param {Object} props - Параметры компонента
 * @property {string} title - Название ЖС
 * @property {string} to - ссылка на страницу ЖС
 *
 * @returns {React$Node} Компонент элемент списка жизненных ситуаций
 */
export const SituationsGridItem = ({ title, to }) => (
  <L.Div className="situation-item inner-24 flex-column border">
    <Link to={to} className="link-overlay" />
    <L.I className="novicon-doc-add title-main-secondary margin-bottom-auto" />
    <L.Div className="situation-description margin-bottom-auto margin-top-16">
      {title}
    </L.Div>
  </L.Div>
);
