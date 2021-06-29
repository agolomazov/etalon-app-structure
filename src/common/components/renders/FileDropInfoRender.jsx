import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Компонент для кастомизация FileDrop
 *
 * @example <L.FileDrop infoRender={FileDropInfoRender} />
 *
 * @returns {React.FC} Компонент для кастомизация FileDrop
 */
export const FileDropInfoRender = ({ Element, elementProps }) => (
  <Element {...elementProps}>
    <L.Img
      className="margin-bottom-8"
      src="https://cdn.esphere.ru/images/nova/download.svg"
      alt="Загрузка"
    />
    Перетащите сюда файл pdf, jpg или png
    <L.Div className="margin-top-8">
      или
      <L.Button className="margin-x-8">выберите файл</L.Button>
      на вашем компьютере
    </L.Div>
    <L.Div className="subtitle margin-top-12">
      Размер файла не более 10 Мб
    </L.Div>
  </Element>
);
