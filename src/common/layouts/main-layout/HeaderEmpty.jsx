import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '@src/constants';

/**
 * ## Компонент пустой шапки приложения
 *
 * @example
 * <HeaderEmpty/>
 *
 * @returns {React.FC} пустая шапка приложения
 */
export const HeaderEmpty = () => (
  <L.Header className="user-box personal-box">
    <L.Nav>
      <Link
        to={APP_ROUTES.MAIN_PAGE}
        className="txt-large txt-bold txt-uppercase"
      >
        <L.Img
          src="https://cdn.esphere.ru/images/ri/logo-ri.png"
          className="margin-right-8"
          alt="Логотип Росимущества"
        />
      </Link>
    </L.Nav>
  </L.Header>
);
