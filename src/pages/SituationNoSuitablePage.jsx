import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import * as L from 'korus-ui';

import { APP_ROUTES } from '@src/constants';
import { MainLayout } from '@common/layouts';
import { SubHeader } from '@common/components';

import { selectors as landlordsSelectors } from '@features/landlords';

import { NoSuitable } from '@features/situations';

/**
 * ## Страница ЖС "Нет подходящей ЖС"
 *
 * @example
 * <SituationNoSuitablePage />
 *
 * @returns {React.FC} cтраница ЖС "Нет подходящей ЖС"
 */
export const SituationNoSuitablePage = () => {
  const landlords = useSelector(landlordsSelectors.landlords) || [];
  return (
    <MainLayout
      subHeader={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <SubHeader>
          <Link
            to={APP_ROUTES.SITUATIONS}
            className="novicon-arrow-backward
                         backward-link
                         txt-gray
                         margin-right-12"
          />
          <L.H1>Нет подходящей жизненной ситуации</L.H1>
        </SubHeader>
      }
    >
      <NoSuitable rosimOffices={landlords} />
    </MainLayout>
  );
};
