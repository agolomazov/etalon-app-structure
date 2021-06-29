import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Компонент выводит ошибки приложения
 *
 * @example
 * <ErrorApp title='Ошибка валидации'/>
 *
 * @param {Object} props - Параметры компонента
 * @param {string} props.title - Заголовок ошибки
 *
 * @returns {React.FC} Компонент выводит ошибки приложения
 */
export const ErrorApp = ({ title }) => (
  <L.Div className="page-content padding-x-32 padding-y-16 border-top">
    <L.Div className="txt-center margin-top-120">
      <L.Img
        src="https://cdn.esphere.ru/images/ri/error-app.svg"
        className="margin-bottom-32"
        alt="Ошибка"
      />
      <L.P>{title || 'Текст ошибки в разработке'}</L.P>
    </L.Div>
  </L.Div>
);
