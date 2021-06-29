import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

/**
 * ## Mockup страницы с сообщением об ощибке
 * @example
 * <ErrorApp />
 */
export const ErrorApp = () => (
  <MainLayout>
    <L.Div className="page-title">
      <L.Div className="flex-row align-items-center">
        <Link
          to="/"
          className="novicon-arrow-backward backward-link txt-gray margin-right-12"
        />
        <L.H1>Мои объекты</L.H1>
      </L.Div>
    </L.Div>

    <L.Div className="page-content padding-x-32 padding-y-16 border-top">
      <L.Div className="txt-center margin-top-120">
        <L.Img
          src="https://cdn.esphere.ru/images/ri/error-app.svg"
          className="margin-bottom-32"
          alt="Ошибка"
        />
        <L.P>Текст ошибки в разработке</L.P>
      </L.Div>
    </L.Div>
  </MainLayout>
);
