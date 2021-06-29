import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Отображение пустого результата поиска договоров/объектов
 * @example
 * <ListEmpty />
 *
 * @returns {React.FC} пустой результат поиска
 */
export const ListEmpty = ({ title = 'Ничего не найдено' }) => (
  <L.Div className="txt-center margin-top-120">
    <L.Img
      src="https://cdn.esphere.ru/images/ri/empty.svg"
      className="margin-bottom-32"
      alt="Ничего не найдено"
    />
    <L.P>{title}</L.P>
  </L.Div>
);
