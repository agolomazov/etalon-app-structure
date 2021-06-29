import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

/**
 * ## Mockup страницы авторизации
 * @example
 * <Auth />
 */
export const Auth = () => (
  <L.Main className="page-sign padding-x-16 txt-center">
    <L.Div className="sign-logo">
      <L.Img
        src="https://cdn.esphere.ru/images/ri/logo-ri-md.png"
        height="130"
        alt="Логотип Росимущества"
      />
    </L.Div>

    <L.Div className="card-sign auth padding-x-24 padding-y-16 margin-x-auto margin-bottom-16 txt-left">
      <L.H1 className="title-main-secondary margin-top-16 margin-bottom-32">
        Вход в личный кабинет
      </L.H1>
      <L.Label>
        Логин
      </L.Label>
      <L.Input
        className="width-100 margin-bottom-12"
        name="login"
      />
      <L.Label>
         Пароль
      </L.Label>
      <Link to="#" className="right">
        Забыли пароль?
      </Link>
      <L.Div _clear />
      <L.Input
        className="width-100 margin-bottom-32"
        name="password"
        type="password"
      />
      <Link to="/sign" className="button-wrapper success block width-100">
        Войти
      </Link>
      {/* Если нужна кнопка */}
      {/* <L.Button className="success width-100">
        Войти
      </L.Button> */}
      <hr className="margin-y-16" />
      <L.Button className="width-100 margin-bottom-16">
        Зарегистрироваться
      </L.Button>
      <Link to="#" className="flex-row align-items-center">
        <L.Img
          src="https://cdn.esphere.ru/images/ri/icon-esia.svg"
          className="icon-esia margin-right-4"
          alt="ЕСИА"
        />
        Войти через госуслуги (ЕСИА)
      </Link>
    </L.Div>

  </L.Main>
);
