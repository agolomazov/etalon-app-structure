import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

/**
 * ## Mockup страницы Профиль пользователя
 * @example
 * <Profile />
 */
export const Profile = () => (
  <MainLayout>
    <L.Div className="page-title">
      <L.Div className="flex-row align-items-center">
        <Link
          to="/"
          className="novicon-arrow-backward backward-link txt-gray margin-right-12"
        />
        <L.H1>Профиль</L.H1>
      </L.Div>
    </L.Div>

    <L.Div className="page-content padding-x-32 padding-y-16 border-top">
      <L.Div className="page-wrapper">
        <L.Div className="flex-row align-items-center">
          <L.Div className="card-sign-type flex-row justify-content-center align-items-center margin-right-24">
            <L.Img
              // иконка для юр. лица
              src="https://cdn.esphere.ru/images/nova/icons/my-accounting.svg"
              // для физ. лица
              //  https://cdn.esphere.ru/images/nova/icons/client-search.svg
              // для ИП
              // https://cdn.esphere.ru/images/nova/icons/partners.svg
              alt="Юридическое лицо"
              height="24" />
          </L.Div>
          <L.Div className="padding-right-24 txt-left">
            <L.Div className="txt-gray">
              Юридическое лицо
            </L.Div>
            <L.H5>
              Цветкова Иванка Константиновна
            </L.H5>
            ООО «Ромашка»
          </L.Div>
          <Link to="#" download className="margin-left-auto">
            <L.I className="novicon-edit margin-right-8" />
            Уточнить данные
          </Link>
        </L.Div>

        <hr className="margin-x-32-negative" />

        <L.Dl className="list w-30 margin-left-84 margin-bottom-32">
          {/* Юр. лицо */}
          <L.Dt>
            Наименование юридического лица
          </L.Dt>
          <L.Dd>
            ООО «Ромашка»
          </L.Dd>
          <L.Dt>
            Юридический адрес
          </L.Dt>
          <L.Dd>
            Фуражный пер., 4, Санкт-Петербург, 191015
          </L.Dd>
          <L.Dt>
            ИНН
          </L.Dt>
          <L.Dd>
            4640915116
          </L.Dd>
          <L.Dt>
            КПП
          </L.Dt>
          <L.Dd>
            901201452
          </L.Dd>
          <L.Dt>
            Руководитель ЮЛ
          </L.Dt>
          <L.Dd>
            Иванов Олег Николаевич
          </L.Dd>
          <L.Dt>
            Почта
          </L.Dt>
          <L.Dd>
            contract@mail.ru
          </L.Dd>
          <L.Dt>
            Телефон
          </L.Dt>
          <L.Dd>
            +7 123 456 78 90
          </L.Dd>
          {/* ИП */}
          {/*
          <L.Dt>
            ОГРНИП
          </L.Dt>
          <L.Dd>
            901201452
          </L.Dd>
          <L.Dt>
            ИНН
          </L.Dt>
          <L.Dd>
            4640915116
          </L.Dd>
          <L.Dt>
            Паспортные данные
          </L.Dt>
          <L.Dd>
            1234 567890
          </L.Dd>
          <L.Dt>
            СНИЛС
          </L.Dt>
          <L.Dd>
            901201452
          </L.Dd>
          <L.Dt>
            Почта
          </L.Dt>
          <L.Dd>
            contract@mail.ru
          </L.Dd>
          <L.Dt>
            Телефон
          </L.Dt>
          <L.Dd>
            +7 123 456 78 90
          </L.Dd>
          */}

          {/* Физ. лицо */}
          {/*
         <L.Dt>
            Паспортные данные
          </L.Dt>
          <L.Dd>
            1234 567890
          </L.Dd>
          <L.Dt>
            СНИЛС
          </L.Dt>
          <L.Dd>
            901201452
          </L.Dd>
          <L.Dt>
            Почта
          </L.Dt>
          <L.Dd>
            contract@mail.ru
          </L.Dd>
          <L.Dt>
            Телефон
          </L.Dt>
          <L.Dd>
            +7 123 456 78 90
          </L.Dd>
          */}
        </L.Dl>
      </L.Div>
    </L.Div>
  </MainLayout>
);
