import React from 'react';
import { useSelector } from 'react-redux';

import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@src/constants';
import { MainLayout } from '@common/layouts';
import { SubHeader } from '@common/components';

import { selectors as landlordsSelectors } from '@features/landlords';

import { Complaint } from '@features/situations';

/**
 * ## Страница ЖС "Жалоба"
 *
 * @example
 * <SituationComplaintPage />
 *
 * @returns {React.FC} cтраница ЖС "Жалоба"
 */
export const SituationComplaintPage = () => {
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
          <L.H1>Жалобы на акты, действия или бездействия должностных лиц</L.H1>
        </SubHeader>
      }
    >
      <Complaint rosimOffices={landlords} />
    </MainLayout>
  );
};
