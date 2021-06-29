import React from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { MainLayout } from '@common/layouts';
import { SubHeader } from '@common/components';

import {
  Situations,
  getSituationsList,
  SITUATIONS_GRID_ITEMS,
} from '@features/situations';

import { selectors as userSelectors } from '@common/modules/user';

/**
 * ## Страница Жизненных ситуаций
 *
 * @example
 * <SituationsPage />
 *
 * @returns {React$Node} Страница Жизненных ситуаций
 */
export const SituationsPage = () => {
  const tenantType = useSelector(userSelectors.tenantType);
  const situationsList = getSituationsList(SITUATIONS_GRID_ITEMS, tenantType);
  return (
    <MainLayout
      subHeader={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <SubHeader>
          <L.H1>Жизненные ситуации</L.H1>
        </SubHeader>
      }
    >
      {tenantType && <Situations situationsList={situationsList} />}
    </MainLayout>
  );
};
