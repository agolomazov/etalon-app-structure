import React from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@src/constants';
import { MainLayout } from '@common/layouts';
import { SubHeader } from '@common/components';

import { Overpayment } from '@features/situations';
import { selectors as contractsSelectors } from '@features/contracts';

/**
 * ## Страница ЖС "Распорядиться переплатой"
 *
 * @example
 * <SituationOverpaymentPage />
 *
 * @returns {React.FC} cтраница ЖС "Распорядиться переплатой"
 */
export const SituationOverpaymentPage = () => {
  const contracts = useSelector(contractsSelectors.contractsList) || [];

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
          <L.H1>Распорядиться переплатой</L.H1>
        </SubHeader>
      }
    >
      <Overpayment contracts={contracts} />
    </MainLayout>
  );
};
