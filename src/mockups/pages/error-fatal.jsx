import React from 'react';
import * as L from 'korus-ui';

import { ErrorLayout } from '@mockups-layouts/error-layout';

/**
 * ## Mockup страницы с сообщением о критической ощибке
 * @example
 * <ErrorFatal />
 */
export const ErrorFatal = () => (
  <ErrorLayout>
    <L.Div className="txt-center margin-top-120 margin-left-224-negative">
      <L.Img
        src="https://cdn.esphere.ru/images/ri/error-fatal.svg"
        className="margin-bottom-32"
        alt="Ошибка"
      />
      <L.P>Что-то пошло не так, попробуйте заново</L.P>
    </L.Div>
  </ErrorLayout>
);
