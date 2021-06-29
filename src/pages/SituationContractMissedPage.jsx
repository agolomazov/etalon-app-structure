import React from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@src/constants';
import { MainLayout } from '@common/layouts';
import { SubHeader } from '@common/components';

import { selectors as landlordsSelectors } from '@features/landlords';
import { ContractMissed } from '@features/situations';

/**
 * ## Страница ЖС Отсутствует договор аренды
 *
 * @example
 * <SituationContractMissedPage />
 *
 * @returns {React$Node} cтраница ЖС Отсутствует договор аренды
 */
export const SituationContractMissedPage = () => {
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
          <L.H1>
            В Личном кабинете отсутствует информация о моем договоре аренды
          </L.H1>
        </SubHeader>
      }
    >
      <ContractMissed landlords={landlords} />
    </MainLayout>
  );
};
