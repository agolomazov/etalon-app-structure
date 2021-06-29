import React from 'react';
import * as L from 'korus-ui';

import { useActions } from '@common/hooks';
import { getUiMessages } from '@common/messages';
import { actions } from '@common/modules/user';

/**
 * ## Отрисовывает страницу ошибки прав доступа пользователя
 * @example
 * <AccessDeniedPage />
 *
 * @returns {React.FC} страница ошибки прав доступа пользователя
 */
export const AccessDeniedPage = () => {
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
        <L.P className="padding-bottom-12">
          У Вас отсутствуют права доступа для работы в Личном кабинете
          Арендатора.
        </L.P>
        <L.P className="padding-bottom-12">
          <>
            {`Обратитесь к руководителю или администратору организации для
              настройки доступа на портале `}
          </>
          <a href="https://www.gosuslugi.ru/">ЕСИА</a>
          <>.</>
        </L.P>
        <L.Button className="margin-right-16" onClick={() => logoutUserFlow()}>
          {getUiMessages('btnLogout')}
        </L.Button>
      </L.Div>
    </L.Main>
  );
};
