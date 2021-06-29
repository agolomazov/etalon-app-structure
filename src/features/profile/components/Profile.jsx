import React from 'react';
import * as L from 'korus-ui';
import { useSelector } from 'react-redux';

import { selectors as userSelectors } from '@common/modules/user';

import { JuridicalPersonProfile } from './JuridicalPresonProfile';
import { SoloPreneurProfile } from './SoloPreneurProfile';
import { NaturalPersonProfile } from './NaturalPersonProfile';

/**
 * ## Компнонет получает данные профила, и определяет какой вариант верстки отрисовывать
 * @example
 * <Profile />
 *
 * @returns {React.FC} Профиль арендатора
 */
export const Profile = () => {
  const isJuridical = useSelector(userSelectors.isTenantTypeJuridical);
  const isEntrepreneur = useSelector(userSelectors.isTenantTypeEntrepreneur);
  const isNatural = useSelector(userSelectors.isTenantTypeNatural);

  return (
    <L.Div className="page-content padding-x-32 padding-y-16 border-top">
      <L.Div className="page-wrapper">
        {isJuridical && <JuridicalPersonProfile />}
        {isEntrepreneur && <SoloPreneurProfile />}
        {isNatural && <NaturalPersonProfile />}
      </L.Div>
    </L.Div>
  );
};
