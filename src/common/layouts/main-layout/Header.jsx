import React from 'react';
import * as L from 'korus-ui';
import { NavLink, Link } from 'react-router-dom';

import { APP_ROUTES } from '@src/constants';
import { HeaderEmpty } from './HeaderEmpty';

/**
 * ## Отображение шапки приложения
 *
 * @example
 * <Header userFullName={userFullName} activeCompanyShortName={activeCompanyShortName} />
 *
 * @param {object} props - Параметры компонента
 * @param {string} props.userFullName - Фио пользователя
 * @param {string} props.activeCompanyShortName - Короткое наименование организации
 * @param {function} props.onLogout - Коллбек выхода из ЛК
 *
 * @returns {React.FC} Шапка приложения
 */
export const Header = ({ userFullName, activeCompanyShortName, onLogout }) => {
  if (!userFullName) {
    return <HeaderEmpty />;
  }
  return (
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
        <L.DropDown className="padding-x-8 right">
          <L.Div className="block-inline txt-right">
            {userFullName}
            <L.Div className="txt-small">{activeCompanyShortName}</L.Div>
          </L.Div>
          <L.I className="novicon-expand margin-left-4" />
          <L.Ul className="pos-right">
            <L.Li>
              <NavLink to={APP_ROUTES.PROFILE}>Профиль</NavLink>
            </L.Li>
            <L.Li>
              <Link to="#" onClick={onLogout}>
                Выход
              </Link>
            </L.Li>
          </L.Ul>
        </L.DropDown>
      </L.Nav>
    </L.Header>
  );
};
