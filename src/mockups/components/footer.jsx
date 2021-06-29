import React from 'react';
import * as L from 'korus-ui';

import packageData from '@packageSrc';

/**
 * ## Mockup футера
 * @example
 * <Footer />
 */
export const Footer = () => (
  <L.Div className="wrapper">
    <L.Main className="content-box items margin-y">
      <L.Footer>
        <L.Div className="txt-gray txt-small">
          <L.Div className="right">8 (800) 100-8-812, бесплатно по РФ</L.Div>
          <L.Div>© КОРУС Консалтинг СНГ, 2012 — 2020</L.Div>
          Версия приложения:&nbsp;
          {packageData.version}
        </L.Div>
      </L.Footer>
    </L.Main>
  </L.Div>
);
