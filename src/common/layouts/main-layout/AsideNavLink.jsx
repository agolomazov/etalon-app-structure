import React from 'react';
import * as L from 'korus-ui';
import { NavLink, Link } from 'react-router-dom';

/**
 * ## Компонент ссылка в панели навигации
 *
 * @example
 * <AsideNavLink title='Жизненные ситуации'
 *  to='situations-list'
 *  iconSrc='https://cdn.esphere.ru/images/ri/icon-situation.svg'
 *  inDevelop={true}/>
 * @param {Object} props - Параметры компонента
 * @property {string} title - Название
 * @property {string} to - ссылка на страницу
 * @property {string} iconSrc - ссылка на иконку
 * @property {bool} inDevelop - если true, находится в разработке
 *
 * @returns {React$Node} Компонент ссылка в панели навигации
 */
export const AsideNavLink = ({ title, to, iconSrc, inDevelop }) => {
  if (inDevelop) {
    return (
      <L.Li className="margin-bottom-8">
        <L.Tooltip title="В разработке" position="right">
          <Link to="#" className="flex-row align-items-center txt-gray">
            <L.Img src={iconSrc} className="margin-right-8" alt={title} />
            {title}
          </Link>
        </L.Tooltip>
      </L.Li>
    );
  }
  return (
    <L.Li className="margin-bottom-8">
      <NavLink
        to={to}
        activeClassName="active"
        className="flex-row align-items-center"
      >
        <L.Img src={iconSrc} className="margin-right-8" alt={title} />
        {title}
      </NavLink>
    </L.Li>
  );
};
