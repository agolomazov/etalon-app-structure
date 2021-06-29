import React from 'react';
import * as L from 'korus-ui';
import { NavLink, Link } from 'react-router-dom';

/**
 * ## Mockup верхнего меню
 * @example
 * <Header />
 */
export const Header = () => (
  <L.Header className="user-box personal-box">
    <L.Nav>
      <Link to="/main-page" className="txt-large txt-bold txt-uppercase">
        <L.Img
          src="https://cdn.esphere.ru/images/ri/logo-ri.png"
          className="margin-right-8"
          alt="Логотип Росимущества"
        />
      </Link>
      <L.DropDown className="padding-x-8 right">
        <L.Div className="block-inline txt-right">
          Цветкова Иванка Константиновна
          <L.Div className="txt-small">ООО «Ромашка»</L.Div>
        </L.Div>
        <L.I className="novicon-expand margin-left-4" />
        <L.Ul className="pos-right">
          <L.Li>
            <NavLink to="/profile">
              Профиль
            </NavLink>
          </L.Li>
          <L.Li>
            <NavLink to="/profile">
              Сменить ЛК Арендатора
            </NavLink>
          </L.Li>
          <L.Li>
            <Link to="/">
              Выход
            </Link>
          </L.Li>
        </L.Ul>
      </L.DropDown>
    </L.Nav>
  </L.Header>
);
