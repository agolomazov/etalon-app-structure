import React from 'react';
import * as L from 'korus-ui';

import { ROSIM_CONTACTS_URL } from '@src/constants';

import { useActions } from '@common/hooks';
import { getUiMessages } from '@common/messages';
import { actions } from '@common/modules/user';

/**
 * ## Отрисовывает страницу пользователя не являющимся арендатором
 * <NotATenantPage />
 *
 * @returns {React.FC} страница пользователя не являющимся арендатором
 */

export const NotATenantPage = () => {
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
        <L.H1 className="title-main-secondary margin-top-16 margin-bottom-32">
          Вход в&nbsp;личный кабинет не&nbsp;доступен
        </L.H1>
        <L.P className="padding-bottom-32">
          В&nbsp;настоящее время Вы не&nbsp;являетесь арендатором федерального
          имущества.
        </L.P>
        <L.P className="padding-bottom-32">
          {`При наличии вопросов просим обращаться в соответствующие
          территориальные органы, контактные данные которых размещены
          на официальном `}
          <a href={ROSIM_CONTACTS_URL}>сайте Росимущества</a>
          <>.</>
        </L.P>
        <L.Button className="margin-right-16" onClick={() => logoutUserFlow()}>
          {getUiMessages('btnLogout')}
        </L.Button>
      </L.Div>
    </L.Main>
  );
};
