import React from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@src/constants';
import { MainLayout } from '@common/layouts';
import { SubHeader } from '@common/components';

import { SubleaseNotice } from '@features/situations';
import { selectors as contractsSelectors } from '@features/contracts';

/**
 * ## Страница ЖС "Уведомление о субаренде"
 *
 * @example
 * <SituationSubleaseNoticePage />
 *
 * @returns {React.FC} cтраница ЖС "Уведомление о субаренде"
 */
export const SituationSubleaseNoticePage = () => {
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
          <L.H1>Уведомление о субаренде</L.H1>
        </SubHeader>
      }
    >
      <SubleaseNotice contracts={contracts} />
    </MainLayout>
  );
};
