import React from 'react';
import * as L from 'korus-ui';
import { Link, useHistory } from 'react-router-dom';

import { MainLayout } from '@common/layouts';
import { SubHeader } from '@common/components';

import { Support } from '@features/support';

/**
 * TODO: Уточнить на счет прогресс-бара
 */
/**
 * ## Отрисовывает страницу раздела Поддержка
 * @example
 * <SupportPage />
 *
 * @returns {React.FC} Страница раздела Поддержка
 */
export const SupportPage = () => {
  const history = useHistory();
  return (
    <MainLayout
      subHeader={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <SubHeader>
          <Link
            to="#"
            onClick={() => {
              if (history) {
                history.goBack();
              }
            }}
            className="
            novicon-arrow-backward
            backward-link
            txt-gray
            margin-right-12"
          />
          <L.H1>Служба поддержки</L.H1>
        </SubHeader>
      }
    >
      <Support />
    </MainLayout>
  );
};
