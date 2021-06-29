import React from 'react';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';

/**
 * ## Компонент с кнопкой подписания документа в Сообщениях
 * @example
 * <MessagesSignButtonBar />
 *
 * @param {object} props - параметры компонента
 * @param {Function} props.onSignAndSubmit - событие по нажатию кнопки
 * @param {Function} props.onReject - событие по отклонению документа
 *
 * @returns {React.FC} Компонент с кнопкой отправки в Сообщениях
 */
export const MessagesSignButtonBar = ({ onSignAndSubmit, onReject }) => (
  <L.Div className="toolbar padding-x-32 margin-top-auto txt-right">
    <L.Button className="left" onClick={() => onReject()}>
      {getUiMessages('btnReject')}
    </L.Button>
    <L.Button className="success" onClick={() => onSignAndSubmit()}>
      {getUiMessages('btnSignAndSubmit')}
    </L.Button>
    <L.Div className="clear" />
  </L.Div>
);
