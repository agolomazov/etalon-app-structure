import React from 'react';
import * as L from 'korus-ui';
import { useSelector } from 'react-redux';

import { GlobalLoader } from '@features/loading';

import {
  selectors as userSelectors,
  useLogout,
  PermissionGuard,
  PERMISSIONS,
} from '@common/modules/user';

import { selectors as errorSelectors, ErrorMain } from '@features/errors';

import { SignSystem } from '@features/signature';

// eslint-disable-next-line max-len
import { IncomingDocumentsConfirmationModal } from '@features/incoming-documents';

import { Header } from './Header';
import { HeaderEmpty } from './HeaderEmpty';
import { Aside } from './Aside';

/**
 * ## Основной layout приложения
 *
 * @example
 * <MainLayout subHeader={<SubHeader>Мои договоры</>}>
 *  <ContractList />
 * </MainLayout>
 *
 * @returns {React.FC} Компонент макета страницы
 */
export const MainLayout = ({ subHeader, children }) => {
  const userFullName = useSelector(userSelectors.userFullName);
  const activeCompanyShortName = useSelector(
    userSelectors.activeCompanyShortName,
  );

  const logout = useLogout();
  const errorExist = useSelector(errorSelectors.isErrorExist);
  const errorIsFatal = useSelector(errorSelectors.isErrorFatal);

  if (errorExist && errorIsFatal) {
    return (
      <>
        <HeaderEmpty />
        <L.Main className="page">
          <ErrorMain />
        </L.Main>
      </>
    );
  }

  return (
    <GlobalLoader>
      <Header
        userFullName={userFullName}
        activeCompanyShortName={activeCompanyShortName}
        onLogout={logout}
      />
      <Aside />
      <L.Main className="page">
        {subHeader && subHeader}
        {errorExist ? <ErrorMain /> : children}
      </L.Main>
      <SignSystem />
      <PermissionGuard permission={PERMISSIONS.incomingDocument.confirmReceipt}>
        <IncomingDocumentsConfirmationModal />
      </PermissionGuard>
    </GlobalLoader>
  );
};
