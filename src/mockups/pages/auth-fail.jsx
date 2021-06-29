import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

/**
 * ## Mockup страницы авторизации
 * @example
 * <Auth />
 */
export const AuthFail = () => (
  <L.Main className="page-sign padding-x-16 txt-center">
    <L.Div className="sign-logo">
      <L.Img
        src="https://cdn.esphere.ru/images/ri/logo-ri-md.png"
        height="130"
        alt="Логотип Росимущества"
      />
    </L.Div>

    {/* Неподтвержденная учетная запись */}
    <L.Div className="card-sign auth padding-x-24 padding-y-16 margin-x-auto margin-bottom-16 txt-left none">
      <L.H1 className="title-main-secondary margin-top-16 margin-bottom-32">
        У вас неподтвержденная учетная запись
      </L.H1>
      <L.P className="padding-bottom-12">
        Работа в&nbsp;Личном кабинете Арендатора возможна только
        с&nbsp;подтвержденной учетной записью
        {' '}
        <Link to="#">
          Госуслуг (ЕСИА)
        </Link>
        .
      </L.P>
      <L.P className="padding-bottom-4">
        Что нужно сделать:
      </L.P>
      <L.Ul className="list auth-fail-list margin-bottom-24">
        <L.Li>
          <L.Span className="tag">
            Лично, обратившись с&nbsp;документом, удостоверяющим личность,
            и&nbsp;СНИЛС в&nbsp;удобный Центр обслуживания
          </L.Span>
        </L.Li>
        <L.Li>
          <L.Span className="tag">
            Онлайн через веб-версии интернет-банков или мобильные приложения
            Сбербанка, Тинькофф Банка, Почта Банка, Банка ВТБ, Банка Санкт-Петербург,
            Ак&nbsp;Барс Банка, СКБ Банка, Газэнергобанка, ДелоБанка (при условии, что
            вы&nbsp;являетесь клиентом одного из&nbsp;банков)
          </L.Span>
        </L.Li>
        <L.Li>
          <L.Span className="tag">
            Почтой, заказав получение кода подтверждения
            личности Почтой России из&nbsp;профиля
          </L.Span>
        </L.Li>
        <L.Li>
          <L.Span className="tag">
            Воспользоваться Усиленной квалифицированной
            электронной подписью.
          </L.Span>
        </L.Li>
      </L.Ul>
      <L.Button className="margin-bottom-8">
        Назад
      </L.Button>
    </L.Div>

    {/* Вход в личный кабинет не доступен */}
    <L.Div className="card-sign auth padding-x-24 padding-y-16 margin-x-auto margin-bottom-16 txt-left">
      <L.H1 className="title-main-secondary margin-top-16 margin-bottom-32">
        Вход в&nbsp;личный кабинет не&nbsp;доступен
      </L.H1>
      <L.P className="padding-bottom-32">
        В&nbsp;настоящее время Вы не&nbsp;являетесь арендатором
        федерального имущества.
      </L.P>
      <L.P className="padding-bottom-32">
        При наличии вопросов просим обращаться
        в&nbsp;соответствующие территориальные органы, контактные данные
        которых размещены на&nbsp;официальном
        {' '}
        <Link to="#">
          сайте Росимущества
        </Link>
        .
      </L.P>
      <L.Button className="margin-bottom-8">
        Выход
      </L.Button>
    </L.Div>

  </L.Main>
);
