import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '@src/constants';

/**
 * ## Отображение пустого результата поиска договоров/объектов
 * @example
 * <MessagesEmptyList />
 *
 * @returns {React$Node} пустой результат
 */
export const MessagesEmptyList = () => (
  <L.Div className="txt-center margin-top-120">
    <L.Img
      src="https://cdn.esphere.ru/images/ri/empty.svg"
      className="margin-bottom-32"
    />
    <L.P>
      В Личном кабинете арендатора отсутствуют направленные Вами обращения или
      полученные от Росимущества уведомления
    </L.P>
    <Link to={APP_ROUTES.SITUATIONS}>
      <L.Button className="txt-black"> Создать обращение</L.Button>
    </Link>
  </L.Div>
);
