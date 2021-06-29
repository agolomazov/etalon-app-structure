import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import * as L from 'korus-ui';

import { APP_ROUTES } from '@src/constants';
import { MainLayout } from '@common/layouts';
import { SubHeader } from '@common/components';

import { selectors as contractsSelectors } from '@features/contracts';
import { selectors as dictionariesSelectors } from '@features/dictionaries';
import { selectors as facilityRentalSelectors } from '@features/rental-objects';

import { ChangeObjectInfo } from '@features/situations';

/**
 * ## Страница ЖС "Внести изменения в характеристики арендованных объектов"
 *
 * @example
 * <SituationChangeObjectInfoPage />
 *
 * @returns {React.FC} ЖС "Внести изменения в характеристики арендованных объектов"
 */
export const SituationChangeObjectInfoPage = () => {
  const contracts = useSelector(contractsSelectors.contractsList) || [];
  const facilityRentalTypes =
    useSelector(dictionariesSelectors.facilityRentalTypes) || [];
  const objectsList = useSelector(facilityRentalSelectors.rentalsList) || [];
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
          <L.H1>Внести изменения в характеристики арендованных объектов</L.H1>
        </SubHeader>
      }
    >
      <ChangeObjectInfo
        contracts={contracts}
        facilityRentalTypes={facilityRentalTypes}
        objectsList={objectsList}
      />
    </MainLayout>
  );
};
