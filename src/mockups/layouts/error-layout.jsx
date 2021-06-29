import React from 'react';
import * as L from 'korus-ui';

import { HeaderEmpty } from '@mockups-components/header-empty';

/**
 * ## Mockup layout страницы с ошибкой
 * @example
 * <ErrorLayout />
 */

export const ErrorLayout = ({ children }) => (
  <>
    <HeaderEmpty />
    <L.Main className="page">
      {children}
    </L.Main>
  </>
);
