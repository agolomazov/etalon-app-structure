import React from 'react';
import * as L from 'korus-ui';

import { Header } from '@mockups-components/header';
import { Aside } from '@mockups-components/aside';

/**
 * ## Mockup основного layout
 * @example
 * <MainLayout />
 */
export const MainLayout = ({ children }) => (
  <>
    <Header />
    <Aside />
    <L.Main className="page">
      {children}
    </L.Main>
  </>
);
