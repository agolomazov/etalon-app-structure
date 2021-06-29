import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

/**
 * ## Отрисовывает блок с ссылкой на тех. поддержку
 * @example
 * <SupportBar />
 *
 * @returns {React.FC} блок с ссылкой на тех. поддержку
 */
export const SupportBar = () => (
  <L.Div className="aside-main-item inner-24 margin-bottom-32">
    <L.Img
      className="margin-bottom-12"
      src="https://cdn.esphere.ru/images/ri/gear.svg"
      alt="Технические проблемы"
    />
    <L.H5 className="margin-bottom-12">Возникли технические проблемы?</L.H5>
    <L.P className="padding-bottom-24">
      Заполните обращение в случае неработоспособности сервиса
    </L.P>
    <Link to="/help/support" className="button default">
      Служба поддержки
    </Link>
  </L.Div>
);
