import React from 'react';
import * as L from 'korus-ui';

import { useActions } from '@common/hooks';
import { getUiMessages } from '@common/messages';
import { actions } from '@common/modules/user';

/**
 * ## Отрисовывает страницу ошибки неподтвержденной УЗ ЕСИА
 * @example
 * <UnconfirmedUserPage />
 *
 * @returns {React.FC} страница ошибки неподтвержденной УЗ ЕСИА
 */
export const UnconfirmedUserPage = () => {
  const { logoutUserFlow } = useActions(actions);
  return (
    <L.Main className="page-sign padding-x-16 txt-center">
      <L.Div className="sign-logo">
        <L.Img
          src="https://cdn.esphere.ru/images/ri/logo-ri-md.png"
          height="130"
          alt="Логотип Росимущества"
        />
      </L.Div>
      <L.Div
        className="card-sign
                  auth
                  padding-x-24
                  padding-y-16
                  margin-x-auto
                  margin-bottom-16
                  txt-left"
      >
        <L.H1
          className="title-main-secondary
                    line-height-1
                    margin-top-16
                    margin-bottom-32"
        >
          У вас неподтвержденная учетная запись
        </L.H1>
        <L.P className="padding-bottom-12">
          <>
            {`Работа в Личном кабинете Арендатора возможна только
            с подтвержденной учетной записью `}
          </>
          <a href="https://www.gosuslugi.ru/">Госуслуг (ЕСИА)</a>
          <>.</>
        </L.P>
        <L.P className="padding-bottom-4">
          Подтвердить учётную запись можно:
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
              Сбербанка, Тинькофф Банка, Почта Банка, Банка ВТБ, Банка
              Санкт-Петербург, Ак&nbsp;Барс Банка, СКБ Банка, Газэнергобанка,
              ДелоБанка (при условии, что вы&nbsp;являетесь клиентом одного
              из&nbsp;банков)
            </L.Span>
          </L.Li>
          <L.Li>
            <L.Span className="tag">
              Почтой, заказав получение кода подтверждения личности Почтой
              России из&nbsp;профиля
            </L.Span>
          </L.Li>
          <L.Li>
            <L.Span className="tag">
              Воспользоваться Усиленной квалифицированной электронной подписью.
            </L.Span>
          </L.Li>
        </L.Ul>
        <L.Button className="margin-right-16" onClick={() => logoutUserFlow()}>
          {getUiMessages('btnLogout')}
        </L.Button>
      </L.Div>
    </L.Main>
  );
};
