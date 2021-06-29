import React from 'react';
import * as L from 'korus-ui';

import { MainLayout } from '@common/layouts';
import { SubHeader } from '@common/components';
import { Help } from '@features/support';

/**
 * ## Отрисовывает страницу раздела Помощь
 * @example
 * <HelpPage />
 *
 * @returns {React.FC} Страница Помощь
 */
export const HelpPage = () => (
  <MainLayout
    subHeader={
      // eslint-disable-next-line react/jsx-wrap-multilines
      <SubHeader>
        <L.H1>Помощь</L.H1>
      </SubHeader>
    }
  >
    <Help />
  </MainLayout>
);
