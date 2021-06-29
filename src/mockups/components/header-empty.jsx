import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

/**
 * ## Mockup пустого верхнего меню
 * @example
 * <HeaderEmpty />
 */
export const HeaderEmpty = () => (
  <L.Header className="user-box personal-box">
    <L.Nav>
      <Link to="/main-page" className="txt-large txt-bold txt-uppercase">
        <L.Img
          src="https://cdn.esphere.ru/images/ri/logo.png"
          height="24"
          className="margin-right-8"
          alt="Логотип Росимущества"
        />
        Росимущество
      </Link>
    </L.Nav>
  </L.Header>
);
