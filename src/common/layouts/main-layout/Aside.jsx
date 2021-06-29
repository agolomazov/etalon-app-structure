import React from 'react';
import * as L from 'korus-ui';
import { ASIDE_NAV_LINKS } from '@src/constants';
import { AsideNavLink } from './AsideNavLink';

/**
 * ## Компонент панель навигации
 *
 * @example
 * <Aside/>
 *
 * @returns {React.FC} Компонент панель навигации
 */
export const Aside = () => (
  <L.Aside className="sidebar flex-column">
    <L.Ul className="list">
      {ASIDE_NAV_LINKS.main.map((props) => (
        <AsideNavLink key={props.title} {...props} />
      ))}
    </L.Ul>

    <L.Ul className="list margin-top-auto padding-top-8 border-top">
      {ASIDE_NAV_LINKS.additional.map((props) => (
        <AsideNavLink key={props.title} {...props} />
      ))}
    </L.Ul>
  </L.Aside>
);
