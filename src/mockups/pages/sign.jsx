import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

/**
 * ## Mockup страницы выбора организации
 * @example
 * <Sign />
 */
export const Sign = () => (
  <L.Main className="page-sign padding-x-16 txt-center">
    <L.Div className="sign-logo">
      <L.Img
        src="https://cdn.esphere.ru/images/ri/logo-ri-md.png"
        height="130"
        alt="Логотип Росимущества"
      />
    </L.Div>
    <L.H1 className="margin-bottom-8">
      Цветкова Иванка Константиновна
    </L.H1>
    <L.P className="txt-large margin-bottom-12">
      Выберите как войти в личный кабинет Арендатора
    </L.P>

    <L.Div className="card-sign flex-row padding-x-24 padding-y-16 margin-x-auto margin-bottom-16">
      <Link to="/agreement" className="link-overlay" />
      <L.Div className="card-sign-type flex-row justify-content-center align-items-center margin-right-24">
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.364 1.09c0 .603.488 1.092 1.09 1.092h3.273c.603 0 1.091.488 1.091 1.09v3.253a1.09
            1.09 0 102.182 0V3.273A3.273 3.273 0 0020.727 0h-3.273c-.602 0-1.09.488-1.09 1.09zm6.545
            15.274a1.09 1.09 0 00-1.09 1.09v3.273a1.09 1.09 0 01-1.092 1.091h-3.273a1.09 1.09 0 000
            2.182h3.273A3.273 3.273 0 0024 20.727v-3.273a1.09 1.09 0 00-1.09-1.09zM6.545 21.818a1.09
            1.09 0 110 2.182H3.273A3.273 3.273 0 010 20.727v-3.273a1.091 1.091 0 012.182 0v3.273c0
            .603.488 1.091 1.09 1.091h3.273zM1.091 7.616a1.09 1.09 0 001.09-1.09V3.272c0-.603.49-1.091
            1.092-1.091h3.272a1.09 1.09 0 100-2.182H3.273A3.273 3.273 0 000 3.273v3.252c0 .603.488 1.091
            1.09 1.091z" fill="#4A4A4A"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            className="card-sign-type-colored"
            d="M8.83 11.726a4.364 4.364 0 116.34 0 6.544 6.544 0 013.376 5.728v1.091a1.09 1.09
            0 01-1.091 1.091H6.545c-.602 0-1.09-.488-1.09-1.09v-1.091a6.544 6.544 0
            013.375-5.729zm3.168-.817H12a2.182 2.182 0 10.003-4.364 2.182 2.182 0 00-.005
            4.364zM12 13.091a4.364 4.364 0 00-4.364 4.364h8.728A4.364 4.364 0 0012 13.09z" fill="#BBC1C5"
          />
        </svg>
      </L.Div>
      <L.Div className="card-sign-description padding-right-24 txt-left">
        <L.Div className="txt-gray">
          Физическое лицо
        </L.Div>
        Цветкова Иванка Константиновна
      </L.Div>
      <L.I className="novicon-arrow-backward card-sign-arrow margin-left-auto" />
    </L.Div>

    <L.Div className="card-sign flex-row padding-x-24 padding-y-16 margin-x-auto margin-bottom-16">
      <Link to="/agreement" className="link-overlay" />
      <L.Div className="card-sign-type flex-row justify-content-center align-items-center margin-right-24">
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            className="card-sign-type-colored"
            d="M12 13.2c-3.429 0-6-3.085-6-7.141C6 2.772 8.744 0 12 0s6 2.772 6 6.059c0 4.056-2.572
            7.141-6 7.141zm0-11.206c2.135 0 3.996 1.893 3.996 4.06 0 2.917-1.704 5.152-3.996 5.152-2.293
            0-3.996-2.235-3.996-5.153 0-2.166 1.86-4.059 3.996-4.059zM6.93 15.256l.393-1.196c.242-.738.926-1.048
            1.562-.744l.007-.012c.027.018.053.037.079.057.028.016.055.033.083.051l-.007.012c.528.466.71 1.3.405 1.958a48.925 48.925 0 01-.546
            1.165l-.063.13c-.233.476-.411.813-.526.98-.081.118-.21.19-.415.265-.193.07-1.023.28-1.522.405-.185.046-.324.081-.369.094-1.233.34-1.91.72-1.955
            1.134-.067.621-.185 2.373-.28 4.163L3.76 24H1.2l.017-.316c.107-1.948.228-3.775.3-4.445.191-1.735
            1.177-2.976 2.686-3.37a94.87 94.87 0 012.727-.613zm15.552 3.983c.073.67.194 2.497.3 4.445L22.8
            24h-2.56l-.015-.282c-.097-1.79-.214-3.542-.282-4.163-.045-.415-.721-.793-1.955-1.134a31.038
            31.038 0 00-.368-.094c-.499-.126-1.33-.335-1.523-.405-.204-.075-.333-.147-.415-.266-.114-.166-.293-.503-.526-.98l-.063-.13a52.916
            52.916 0 01-.544-1.16c-.307-.661-.124-1.496.403-1.962l-.007-.012.084-.051c.025-.02.052-.039.079-.057l.007.012c.636-.304
            1.32.006 1.562.744l.393 1.196c1.338.29 2.35.514 2.727.614 1.509.393 2.494 1.634 2.685 3.37z" fill="#BBC1C5"
          />
          <path
            d="M10.652 19.322c-.558-.494-.664-1.422-.236-2.07l.757-1.145c.447-.676
            1.208-.676 1.654 0l.758 1.145c.428.649.323 1.575-.237 2.07l-.165.146L14.4
            24H9.6l1.217-4.532-.165-.146z" fill="#4A4A4A"
          />
        </svg>
      </L.Div>
      <L.Div className="padding-right-24 txt-left">
        <L.Div className="txt-gray">
          Юридическое лицо
        </L.Div>
        ИП «Цветкова И.К.»
        <L.Div className="margin-top-4 txt-micro txt-gray">
          ИНН 4707038253 / ОГРН 1154704003695
        </L.Div>
      </L.Div>
      <L.I className="novicon-arrow-backward card-sign-arrow margin-left-auto" />
    </L.Div>

    <L.Div className="card-sign flex-row padding-x-24 padding-y-16 margin-x-auto margin-bottom-16">
      <Link to="/agreement" className="link-overlay" />
      <L.Div className="card-sign-type flex-row justify-content-center align-items-center margin-right-24">
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            className="card-sign-type-colored"
            d="M20 4h-4a4 4 0 00-8 0H4a4 4 0 00-4 4v12a4 4 0 004 4h16a4 4 0 004-4V8a4 4 0
            00-4-4zm-8-2a2 2 0 012 2h-4a2 2 0 012-2zM8 21v1h8v-1a4 4 0 00-8 0zm2-8a2 2 0
            114 0 2 2 0 01-4 0zm10 9a2 2 0 002-2V8a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0
            002 2h2v-1a6 6 0 013.107-5.25 4 4 0 115.786 0A6 6 0 0118 21v1h2z" fill="#BBC1C5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 0a4 4 0 014 4h-2a2 2 0 10-4 0H8a4 4 0 014-4z"
            fill="#4A4A4A"
          />
        </svg>
      </L.Div>
      <L.Div className="padding-right-24 txt-left">
        <L.Div className="txt-gray">
          Физическое лицо
        </L.Div>
        ООО «Ромашка»
        <L.Div className="margin-top-4 txt-micro txt-gray">
          ИНН 4707038253 / ОГРН 1154704003695
        </L.Div>
      </L.Div>
      <L.I className="novicon-arrow-backward card-sign-arrow margin-left-auto" />
    </L.Div>

  </L.Main>
);
