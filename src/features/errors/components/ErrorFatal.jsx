import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Компонент выводит ошибки сервера
 *
 * @example
 * <ErrorFatal/>
 *
 * @param {Object} props - Параметры компонента
 * @param {string} props.code - код серверной ошибки
 * @param {string} props.title - заголовок
 * @param {string} props.message - текст серверной ошибки
 *
 * @returns {React.FC} Компонент выводит ошибки сервера
 */
export const ErrorFatal = ({ code, title, message }) => (
  <L.Div className="txt-center margin-top-120 margin-left-224-negative">
    <L.Img
      src="https://cdn.esphere.ru/images/ri/error-fatal.svg"
      className="margin-bottom-32"
    />
    <L.P>{title || 'Что-то пошло не так, попробуйте заново'}</L.P>
    <L.P shouldRender={!!code}>{`${code} Ошибка`}</L.P>
    <L.P _txt-gray shouldRender={!!message}>
      {message}
    </L.P>
  </L.Div>
);
