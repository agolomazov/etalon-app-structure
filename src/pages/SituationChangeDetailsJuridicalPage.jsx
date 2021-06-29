import React from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';
import { Link, Redirect } from 'react-router-dom';

import { APP_ROUTES, TENANT_TYPES } from '@src/constants';
import { MainLayout } from '@common/layouts';
import { SubHeader } from '@common/components';
import { selectors as userSelectors } from '@common/modules/user';

import { ChangeDetailsJuridical } from '@features/situations';

/**
 * ## Страница ЖС "Изменить реквизиты ЮЛ"
 *
 * @example
 * <SituationChangeDetailsJuridicalPage />
 *
 * @returns {React$Node} Страница ЖС "Изменить реквизиты ЮЛ"
 */
export const SituationChangeDetailsJuridicalPage = () => {
  const tenantType = useSelector(userSelectors.tenantType);

  if (tenantType !== TENANT_TYPES.JURIDICAL_PERSON) {
    return <Redirect to={APP_ROUTES.SITUATIONS} />;
  }

  return (
    <MainLayout
      subHeader={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <SubHeader>
          <Link
            to={APP_ROUTES.SITUATIONS}
            className="novicon-arrow-backward
                      backward-link txt-gray
                      margin-right-12"
          />
          <L.H1>Изменить реквизиты Арендатора</L.H1>
        </SubHeader>
      }
    >
      <ChangeDetailsJuridical />
    </MainLayout>
  );
};
