import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@src/constants';
import { MainLayout } from '@common/layouts';
import { SubHeader } from '@common/components';
import { Profile } from '@features/profile';

/**
 * ## Отрисовывает страницу профиля
 * @example
 * <ProfilePage />
 *
 * @returns {React.FC} Страница профиля
 */
export const ProfilePage = () => (
  <MainLayout
    subHeader={
      // eslint-disable-next-line react/jsx-wrap-multilines
      <SubHeader>
        <Link
          to={APP_ROUTES.MAIN_PAGE}
          className="novicon-arrow-backward backward-link
                     txt-gray margin-right-12"
        />
        <L.H1>Профиль</L.H1>
      </SubHeader>
    }
  >
    <Profile />
  </MainLayout>
);
