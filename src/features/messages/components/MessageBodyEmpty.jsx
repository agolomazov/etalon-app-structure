import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Заглушка если не выбрано обращение
 * @example
 * <MessageBodyEmpty />
 * @returns {React.FC} заглушка если не выбрано обращение
 */
export const MessageBodyEmpty = () => (
  <L.Div className="message-body-scroll-area flex-column width-100">
    <L.Div className="txt-center margin-top-120">
      <L.Img
        src="https://cdn.esphere.ru/images/ri/error-app.svg"
        className="margin-bottom-32"
        alt="Ошибка"
      />
      <L.P>Выберите элемент для просмотра</L.P>
    </L.Div>
  </L.Div>
);
