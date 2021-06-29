import React from 'react';
import * as L from 'korus-ui';
import { NavLink, Link } from 'react-router-dom';

/**
 * ## Mockup бокового меню
 * @example
 * <Aside />
 */
export const Aside = () => (
  <L.Aside className="sidebar flex-column">
    <L.Ul className="list">
      <L.Li className="margin-bottom-8">
        <NavLink
          to="/contracts-list"
          activeClassName="active"
          className="flex-row align-items-center"
        >
          <L.Img
            src="https://cdn.esphere.ru/images/ri/icon-contract.svg"
            className="margin-right-8"
            alt="Договоры"
          />
          Мои договоры
        </NavLink>
      </L.Li>
      <L.Li className="margin-bottom-8">
        <NavLink
          to="/objects-list"
          activeClassName="active"
          className="flex-row align-items-center"
        >
          <L.Img
            src="https://cdn.esphere.ru/images/ri/icon-object.svg"
            className="margin-right-8"
            alt="Объекты"
          />
          Мои объекты
        </NavLink>
      </L.Li>
      <L.Li className="margin-bottom-8">
        <NavLink
          to="/situations-list"
          activeClassName="active"
          className="flex-row align-items-center"
        >
          <L.Img
            src="https://cdn.esphere.ru/images/ri/icon-situation.svg"
            className="margin-right-8"
            alt="Жизненные ситуации"
          />
          Жизненные ситуации
        </NavLink>
      </L.Li>
      <L.Li className="margin-bottom-8">
        <NavLink
          to="/messages"
          activeClassName="active"
          className="flex-row align-items-center"
        >
          <L.Img
            src="https://cdn.esphere.ru/images/ri/icon-message.svg"
            className="margin-right-8"
            alt="Сообщения"
          />
          Сообщения
        </NavLink>
      </L.Li>
    </L.Ul>

    <L.Ul className="sidebar-bottom list margin-top-auto padding-top-8 border-top">
      <L.Li className="margin-bottom-8">
        <L.Tooltip
          title="В разработке"
          position="right"
        >
          <Link to="#" className="flex-row align-items-center txt-gray">
            <L.Img
              src="https://cdn.esphere.ru/images/nova/icons/leasing.svg"
              className="margin-right-8"
              alt="Общая информация"
            />
            Общая информация
          </Link>
        </L.Tooltip>
      </L.Li>
      <L.Li className="margin-bottom-8">
        <NavLink
          to="/feedback"
          activeClassName="active"
          className="flex-row align-items-center txt-gray"
        >
          <L.Img
            src="https://cdn.esphere.ru/images/nova/icons/sms-accounting.svg"
            className="margin-right-8"
            alt="Отзыв"
          />
          Оставить отзыв
        </NavLink>
      </L.Li>
      <L.Li className="margin-bottom-8">
        <NavLink
          to="/help"
          activeClassName="active"
          className="flex-row align-items-center txt-gray"
        >
          <L.Img
            src="https://cdn.esphere.ru/images/nova/icons/help-monochrome.svg"
            className="margin-right-8"
            alt="Помощь"
          />
          Помощь
        </NavLink>
      </L.Li>
    </L.Ul>
  </L.Aside>
);
