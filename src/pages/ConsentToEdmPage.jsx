import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import * as L from 'korus-ui';

import { APP_ROUTES } from '@src/constants';
import { useActions } from '@common/hooks';

import { selectors as loadingSelectors } from '@features/loading';
import {
  EdmConsentModal,
  EdmInfoModal,
  selectors as tenantSelectors,
  actions as tenantActions,
} from '@features/tenant';
import {
  selectors as userSelectors,
  actions as userActions,
  PermissionGuard,
  PERMISSIONS,
} from '@common/modules/user';
/**
 * ## Страница согласия на ЭДО
 *
 * @example
 * <ConsentToEdmPage />
 *
 * @returns {React.FC} Страница согласия на ЭДО
 */
/* eslint-disable react/no-danger */
export const ConsentToEdmPage = () => {
  const isLoading = useSelector(loadingSelectors.isLoading);
  const isLoadingGlobal = useSelector(loadingSelectors.isGlobal);
  const isUserConsentToEdm = useSelector(userSelectors.isUserConsentToEdm);
  const consentToEdmText = useSelector(tenantSelectors.consentToEdmText);
  const { logoutUserFlow } = useActions(userActions);
  const { loadConsentToEdmTextFlow, sendConsentToEdmFlow } = useActions(
    tenantActions,
  );

  useEffect(() => {
    if (!isUserConsentToEdm) {
      loadConsentToEdmTextFlow();
    }
  }, [isUserConsentToEdm]);

  if (isUserConsentToEdm) {
    return <Redirect to={APP_ROUTES.MAIN_PAGE} />;
  }

  return (
    <>
      <L.Loader isLoading={isLoadingGlobal} isGlobal />

      <L.Main className="page-sign padding-x-16 txt-center" />

      <PermissionGuard permission={PERMISSIONS.edo.edoConsent}>
        <EdmConsentModal
          isLoading={isLoading}
          onConfirm={sendConsentToEdmFlow}
          onLogout={logoutUserFlow}
        >
          <L.P dangerouslySetInnerHTML={{ __html: consentToEdmText }} />
        </EdmConsentModal>
      </PermissionGuard>

      <PermissionGuard
        permission={PERMISSIONS.edo.edoConsent}
        shouldRenderIfNoPermission
      >
        <EdmInfoModal onLogout={logoutUserFlow} />
      </PermissionGuard>
    </>
  );
};
