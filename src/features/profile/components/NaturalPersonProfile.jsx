import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { TENANT_TYPE_MAP, TENANT_TYPES } from '@src/constants';
import { getUserFullName } from '@common/utils';
import { selectors as userSelectors } from '@common/modules/user';

/**
 * ## Отрисовка профиля Физического лица
 *
 * @example
 * <NaturalPersonProfile>
 *
 * @returns {React.FC} профиль Физического лица
 */
export const NaturalPersonProfile = () => {
  const { name, email, mobilePhone, snils } = useSelector(
    userSelectors.tenantNaturalInfo,
  );

  const { displayText } = TENANT_TYPE_MAP[TENANT_TYPES.NATURAL_PERSON];

  return (
    <>
      <L.Div className="flex-row align-items-center">
        <L.Div
          className="card-sign-type
            flex-row
            justify-content-center
            align-items-center
            margin-right-24"
        >
          <L.Img
            src="https://cdn.esphere.ru/images/nova/icons/client-search.svg"
            height="24"
            alt={displayText}
          />
        </L.Div>
        <L.Div className="padding-right-24 txt-left">
          <L.Div className="txt-gray">{displayText}</L.Div>
          <L.H5>{getUserFullName(name, true)}</L.H5>
        </L.Div>
        <Link to="#" download className="margin-left-auto">
          {/* <L.I className="novicon-edit margin-right-8" />
           Уточнить данные */}
        </Link>
      </L.Div>
      <hr className="margin-x-32-negative" />
      <L.Dl className="list w-30 margin-left-84 margin-bottom-32">
        <L.Dt>СНИЛС</L.Dt>
        <L.Dd>{snils}</L.Dd>
        {email && (
          <>
            <L.Dt>Почта</L.Dt>
            <L.Dd>{email}</L.Dd>
          </>
        )}
        {mobilePhone && (
          <>
            <L.Dt>Телефон</L.Dt>
            <L.Dd>{mobilePhone}</L.Dd>
          </>
        )}
      </L.Dl>
    </>
  );
};
