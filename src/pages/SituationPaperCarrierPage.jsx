import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@src/constants';
import { MainLayout } from '@common/layouts';
import { SubHeader } from '@common/components';

import { PaperCarrier } from '@features/situations';

/**
 * ## Страница ЖС "Заявление на получение / на отказ от получения документов на бумажном носителе"
 *
 * @example
 * <SituationPaperCarrierPage />
 *
 * @returns {React.FC} cтраница ЖС "Заявление на получение / на отказ от получения документов на бумажном носителе"
 */
export const SituationPaperCarrierPage = () => (
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
          Заявление на получение / на отказ от получения документов на бумажном
          носителе
        </L.H1>
      </SubHeader>
    }
  >
    <PaperCarrier />
  </MainLayout>
);
