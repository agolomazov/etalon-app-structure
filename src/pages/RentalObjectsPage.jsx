import React from 'react';
import * as L from 'korus-ui';
import { useSelector } from 'react-redux';

import { MainLayout } from '@common/layouts';
import { SubHeader } from '@common/components';

import { selectors as appSettingsSelectors } from '@features/app-settings';
import { selectors as dictionariesSelectors } from '@features/dictionaries';
import { RentalObjectsList } from '@features/rental-objects';

/**
 * ## Страница "Мои объекты"
 * @example
 * <RentalObjectsPage />
 *
 * @returns {React.FC} Страница "Мои объекты"
 */
export const RentalObjectsPage = () => {
  const isRentalsBeFiltrationEnabled = useSelector(
    appSettingsSelectors.isRentalsBeFiltrationEnabled,
  );
  const facilityRentalTypes =
    useSelector(dictionariesSelectors.facilityRentalTypes) || [];

  return (
    <MainLayout
      subHeader={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <SubHeader>
          <L.H1>Мои объекты</L.H1>
        </SubHeader>
      }
    >
      <RentalObjectsList
        facilityRentalTypes={facilityRentalTypes}
        shouldRenderPagination={isRentalsBeFiltrationEnabled}
      />
    </MainLayout>
  );
};
